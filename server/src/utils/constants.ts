import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const DOMAIN = process.env.MAIL_DOMAIN!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export {
  ACCESS_SECRET,
  REFRESH_SECRET,
  DOMAIN,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
};
