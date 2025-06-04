import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import bcrypt from "bcrypt";

const DOMAIN = process.env.MAIL_DOMAIN!;

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body || {};

    if (!name || !username || !email || !password) {
      res.status(400);
      throw new Error(
        "All fields are required: name, username, email, password"
      );
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${email}, inbox_email.eq.${username}@${DOMAIN}`)
      .single();

    if (existingUser) {
      res.status(400);
      throw new Error(`User already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const inbox_email = `${username}@${DOMAIN}`;

    const { error } = await supabase.from("users").insert({
      username,
      name,
      email,
      password_hash: hashedPassword,
      inbox_email,
    });

    if (error) {
      res.status(400);
      throw new Error(`Error creating user: ${error.message}`);
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        inbox_email,
        username,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(
      error instanceof Error ? error.message : "Internal Server Error"
    );
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      res.status(400);
      throw new Error("Username and password are required");
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .or(`username.eq.${username}`)
      .single();

    if (error || !user) {
      res.status(401);
      throw new Error("User not found or invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid password");
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        inbox_email: user.inbox_email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(
      error instanceof Error ? error.message : "Internal Server Error"
    );
  }
};

export { registerUser, loginUser };
