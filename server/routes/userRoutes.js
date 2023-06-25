import express from "express";
import {
  getAllUser,
  getuser,
  login,
  register,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-alluser", getAllUser);
router.get("/getUser", authMiddleware, getuser);
export default router;
