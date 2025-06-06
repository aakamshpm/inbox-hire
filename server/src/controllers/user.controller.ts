import { Request, Response } from "express";
import { supabase } from "../config/supabase";

const fetchApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401);
      throw new Error("Unauthorized: User ID not found");
    }

    // Assuming you have a function to get applications by user ID
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      res.status(500);
      throw new Error("Failed to fetch applications: " + error.message);
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500);
    throw new Error("Failed to fetch applications");
  }
};

const fetchUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401);
      throw new Error("Unauthorized: User ID not found");
    }

    // Fetch user profile from Supabase
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      res.status(500);
      throw new Error("Failed to fetch user profile: " + error.message);
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500);
    throw new Error("Failed to fetch user profile");
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401);
      throw new Error("Unauthorized: User ID not found");
    }

    const { name, username, email, inbox_email } = req.body;

    // Update user profile in Supabase
    const { data, error } = await supabase
      .from("users")
      .update({ name, username, email, inbox_email })
      .eq("id", userId)
      .single();

    if (error) {
      res.status(500);
      throw new Error("Failed to update user profile: " + error.message);
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500);
    throw new Error("Failed to update user profile");
  }
};

export { fetchApplications, fetchUserProfile, updateUserProfile };
