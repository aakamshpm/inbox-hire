import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const parseEmailWithGemini = async (subject: string, body: string) => {
  const prompt = `
You're a job application parsing assistant. Extract structured data from the email below.

EMAIL SUBJECT:
${subject}

EMAIL BODY:
${body}

Return a JSON with:
{
  "job_title": "...",
  "company_name": "...",
  "status": "...", // e.g. "applied", "interview", "rejected", "offer"
  "notes": "...", // summary or key info from body
  "is_reply": true/false
  "isJobApplication": true/false // true if it's a job application email, if it doesn't seem like a job application, set this to false
}
The job_title should be extracted from the subject or body. If the job title is not clear, use "unknown".
If the email is a reply to an existing application, set "is_reply" to true and include the status and notes.
If the email is a new application, set "is_reply" to false.
If you cannot extract any information, return an empty JSON object {}.
Dont include any other text or explanations or comments, just the JSON.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
};

export default parseEmailWithGemini;
