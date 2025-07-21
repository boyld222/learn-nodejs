import { Router } from "express";
import { getAllUser } from "../controllers/userController.js";
const router = Router();

router.get("/get-all", getAllUser);

export default router;