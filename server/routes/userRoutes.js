import express from "express";
import { getAllUser, login, register } from "../controllers/userController.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/get-alluser",getAllUser);

export default router;