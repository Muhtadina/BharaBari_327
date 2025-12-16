// src/services/UserService.js
import sql from "../config/db.js";
import UserFactory from "../factories/UserFactory.js";

class UserService {
  static async register({ full_name, email, password, account_type }) {
    // Insert into base_users and get the new user_id
    const userInsert = await sql`
      INSERT INTO base_users (full_name, email, password_hash, account_type)
      VALUES (${full_name}, ${email}, ${password}, ${account_type})
      RETURNING user_id
    `;

    const user_id = userInsert[0].user_id;

    // Generate username via factory
    const userObj = UserFactory.createUser(account_type, { full_name, user_id });

    // Update user with username
    await sql`
      UPDATE base_users
      SET username = ${userObj.username}
      WHERE user_id = ${user_id}
    `;

    return { message: "Registration successful", username: userObj.username };
  }

  static async login({ username, password }) {
    // Try base_users first
    const users = await sql`
      SELECT * FROM base_users
      WHERE username = ${username}
    `;

    if (users.length > 0) {
      const user = users[0];
      if (user.password_hash !== password) throw new Error("Invalid credentials");
      return { username: user.username, role: user.account_type, user_id: user.user_id };
    }

    // If not found, check admin table
    const admins = await sql`
      SELECT * FROM admins
      WHERE username = ${username}
    `;
    if (admins.length === 0) throw new Error("User not found");

    const admin = admins[0];
    if (admin.password_hash !== password) throw new Error("Invalid credentials");
    return { username: admin.username, role: "admin", admin_id: admin.admin_id };
  }

  static async getProfile(user_id) {
    const users = await sql`
      SELECT * FROM base_users
      WHERE user_id = ${user_id}
    `;
    if (users.length === 0) throw new Error("User not found");
    return users[0];
  }
}

export default UserService;
