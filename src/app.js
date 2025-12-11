// Main Server
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import flatRoutes from "./routes/flatRoutes.js";
import negotiationRoutes from "./routes/negotiationRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Static frontend serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/negotiations", negotiationRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
