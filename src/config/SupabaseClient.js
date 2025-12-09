// Singleton -> SupabaseClient.js
import { createClient } from "@supabase/supabase-js";

class SupabaseClientSingleton {
  constructor() {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
      );
    }
  }

  getClient() {
    return SupabaseClientSingleton.instance;
  }
}

export default new SupabaseClientSingleton();
