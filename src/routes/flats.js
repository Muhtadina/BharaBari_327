// backend/routes/flats.js
import express from "express";
import sql from "../config/db.js"; // your db.js singleton

const router = express.Router();

// GET all flats with optional image
router.get("/", async (req, res) => {
  try {
    const flats = await sql`
      SELECT f.flat_id,
             f.building,
             f.division,
             f.location_ AS location,
             f.room_count,
             f.floor_level,
             f.catagory,
             f.rentpermonth,
             f.gas_bill,
             f.current_bill,
             COALESCE(fi.image_url, '') AS image_url
      FROM flats f
      LEFT JOIN flat_images fi
      ON fi.flat_id = f.flat_id
      GROUP BY f.flat_id, fi.image_url
      ORDER BY f.created_at DESC
    `;
    res.json(flats);
  } catch (err) {
    console.error("Error fetching flats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET single flat by id (for view_flat_details.html)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flat = await sql`
      SELECT f.*,
             COALESCE(fi.image_url, '') AS image_url
      FROM flats f
      LEFT JOIN flat_images fi
      ON fi.flat_id = f.flat_id
      WHERE f.flat_id = ${id}
    `;
    if (flat.length === 0) return res.status(404).json({ error: "Flat not found" });
    res.json(flat[0]);
  } catch (err) {
    console.error("Error fetching flat:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
