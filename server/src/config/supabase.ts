import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "../utils/constants";

dotenv.config();

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
