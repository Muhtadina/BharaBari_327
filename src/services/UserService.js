import supabase from "../config/SupabaseClient.js";
import UserFactory from "../factories/UserFactory.js";

class UserService {
  static async register(data) {
    const client = supabase.getClient();
    const { full_name, email, password, account_type } = data;

    // Insert temporary row to get user_id
    const { data: tempUser, error: tempError } = await client
      .from("base_users")
      .insert({ full_name, email, password_hash: password, account_type })
      .select("user_id")
      .single();

    if (tempError) throw new Error(tempError.message);

    // Generate username using UserFactory
    const userObj = UserFactory.createUser(account_type, {
      ...data,
      user_id: tempUser.user_id
    });

    // Update the row with generated username
    const { error: updateError } = await client
      .from("base_users")
      .update({ username: userObj.username })
      .eq("user_id", tempUser.user_id);

    if (updateError) throw new Error(updateError.message);

    return { message: "Registration successful", username: userObj.username };
  }

  static async login({ username, password }) {
    const client = supabase.getClient();

    // Check base_users first
    let { data, error } = await client
      .from("base_users")
      .select("*")
      .eq("username", username)
      .single();

    // If not found in base_users, check admins
    if (error) {
      ({ data, error } = await client
        .from("admins")
        .select("*")
        .eq("username", username)
        .single());

      if (error) throw new Error("User not found");

      if (data.password_hash !== password) throw new Error("Invalid credentials");
      data.role = "admin";
      return data;
    }

    if (data.password_hash !== password) throw new Error("Invalid credentials");
    return data; // includes account_type
  }
}

export default UserService;
