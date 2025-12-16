// routes/userRoutes.js
import express from "express";
import sql from "../config/db.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { full_name, email, password, account_type } = req.body;

  if (!full_name || !email || !password || !account_type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Insert user
    const inserted = await sql`
      INSERT INTO base_users (full_name, email, password_hash, account_type)
      VALUES (${full_name}, ${email}, ${password}, ${account_type})
      RETURNING user_id, full_name, account_type;
    `;

    const { user_id } = inserted[0];
    const prefix = account_type.charAt(0).toUpperCase();
    const idStr = String(user_id).padStart(3, "0");
    const namePart = (full_name.slice(0,3) + full_name.slice(-2)).toLowerCase();
    const username = prefix + idStr + namePart;

    // Update username
    await sql`
      UPDATE base_users
      SET username = ${username}
      WHERE user_id = ${user_id};
    `;

    res.json({ username, account_type });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Fetch user from DB
    const users = await sql`
      SELECT user_id, full_name, username, password_hash, account_type
      FROM base_users
      WHERE username = ${username};
    `;

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // Check password (replace with hash comparison if using bcrypt)
    if (user.password_hash !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({
      username: user.username,
      account_type: user.account_type
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;