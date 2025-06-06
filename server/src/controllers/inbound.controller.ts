import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import parseEmailWithGemini from "../utils/gemini";

interface ParsedEmail {
  job_title?: string;
  company?: string;
  status?: string;
  notes?: string;
  is_reply?: boolean;
}

const handleInboundEmail = async (req: Request, res: Response) => {
  try {
    const {
      From,
      Subject,
      TextBody,
      ReceivedAt,
      OriginalRecipient,
      CcFull = [],
      BccFull = [],
    } = req.body;

    let user = null;

    res.status(200).json({ message: "Accepted" }); // send response early

    // 1. Try OriginalRecipient first
    console.log("OriginalRecipient:", OriginalRecipient);
    if (OriginalRecipient) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("inbox_email", OriginalRecipient)
        .single();
      if (data) user = data;
    }

    // 2. Fallback: Check Cc and Bcc
    if (!user) {
      const allTrackingEmails = [...CcFull, ...BccFull].map(
        (entry) => entry.Email
      );

      for (const email of allTrackingEmails) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("inbox_email", email)
          .single();
        if (data) {
          user = data;
          break;
        }
      }
    }

    if (!user) {
      console.log("No User found for email:", OriginalRecipient);
      return;
    }

    // Use AI/email parser
    const response = await parseEmailWithGemini(Subject, TextBody);

    function extractJsonString(input: string): ParsedEmail | null {
      const match = input.match(/```json\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        try {
          return JSON.parse(match[1]) as ParsedEmail;
        } catch (err) {
          console.error("Invalid JSON content:", err);
        }
      }
      return null;
    }
    const parsed = extractJsonString(response);
    console.log("Parsed email data:", parsed);

    if (parsed?.is_reply) {
      // Find existing application
      const { data: existingApplications } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id);

      const match = existingApplications?.find(
        (app) =>
          app.company?.toLowerCase() === parsed.company?.toLowerCase() &&
          app.job_title?.toLowerCase() === parsed.job_title?.toLowerCase()
      );

      if (match) {
        const { error } = await supabase
          .from("applications")
          .update({
            status: parsed.status,
            is_reply: true,
            notes: parsed.notes,
            received_at: ReceivedAt,
          })
          .eq("id", match.id);

        if (error) {
          console.log("Error updating existing application:", error);
          return;
        }

        console.log("Updated existing application:", match.id);
        return;
      } else {
        console.log("No matching application found for reply");
      }
    } else {
      // New application
      const { data, error } = await supabase.from("applications").insert({
        user_id: user.id,
        job_title: parsed?.job_title,
        source_email: From,
        company_name: parsed?.company,
        status: parsed?.status,
        body_preview: TextBody,
        is_reply: false,
        notes: parsed?.notes,
        received_at: ReceivedAt,
      });

      if (error) {
        console.log("Error inserting new application:", error);
        return;
      }

      console.log("Inserted new application for user:", user.id);
    }
  } catch (error) {
    res.status(500);
    console.log("Error processing inbound email:", error);
  }
};

export { handleInboundEmail };
