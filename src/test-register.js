// src/test-register.js
import sql from "./config/db.js"; // your db.js
import UserFactory from "./factories/UserFactory.js";

async function testRegister() {
  try {
    const data = {
      full_name: "Muhtadina Tasin",
      email: "muhtadinaserniabattasin@gmail.com",
      password: "333333",
      account_type: "renter",
    };

    // 1️⃣ Insert without username first
    const inserted = await sql`
      INSERT INTO base_users (full_name, email, password_hash, account_type)
      VALUES (${data.full_name}, ${data.email}, ${data.password}, ${data.account_type})
      RETURNING *;
    `;

    if (!inserted[0]) throw new Error("Insertion failed");

    const user_id = inserted[0].user_id;

    // 2️⃣ Generate username now using user_id
    const userObj = UserFactory.createUser(data.account_type, { ...data, user_id });
    const username = userObj.username;

    // 3️⃣ Update the username in the database
    await sql`
      UPDATE base_users
      SET username = ${username}
      WHERE user_id = ${user_id};
    `;

    console.log("User registered successfully:", username);
  } catch (err) {
    console.error("Test registration failed:", err);
  }
}

testRegister();
