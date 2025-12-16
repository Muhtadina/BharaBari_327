// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import flatRoutes from "./routes/flatRoutes.js";
import negotiationRoutes from "./routes/negotiationRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use("/routes/users", userRoutes);
app.use("/routes/flats", flatRoutes);
app.use("/routes/negotiations", negotiationRoutes);
app.use("/routes/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
