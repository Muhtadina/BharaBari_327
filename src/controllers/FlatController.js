// backend/controllers/flatController.js
import FlatService from "../services/FlatService.js";

export const createFlat = async (req, res) => {
    try {
        const flat = await FlatService.createFlat(req.body);
        res.status(201).json(flat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllFlats = async (req, res) => {
    try {
        const flats = await FlatService.getAll();
        res.json(flats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getFlatById = async (req, res) => {
    try {
        const flat = await FlatService.getById(req.params.flatId);
        res.json(flat);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};
