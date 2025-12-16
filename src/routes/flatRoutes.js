import express from "express";
import { createFlat, getAllFlats, getFlatById } from "../controllers/FlatController.js";

const router = express.Router();

router.post("/create", createFlat);
router.get("/", getAllFlats);
router.get("/:flatId", getFlatById);

export default router;

