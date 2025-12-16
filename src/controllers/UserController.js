import UserService from "../services/UserService.js";

export const registerUser = async (req, res) => {
  console.log("REGISTER HIT", req.body);
  try {
    const result = await UserService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await UserService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const result = await UserService.getProfile(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

