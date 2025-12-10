// Only to text if the Supabase database works - 
// involving .env with the API keys

import supabase from "./src/config/SupabaseClient.js";

const client = supabase.getClient();

const { data, error } = await client.from("base_users").select("*");

console.log(data, error);
