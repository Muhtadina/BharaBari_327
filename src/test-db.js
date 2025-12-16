import sql from "./config/db.js";

const test = async () => {
  const result = await sql`SELECT NOW()`;
  console.log(result);
  process.exit();
};

test();
