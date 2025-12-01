import { Router } from "express";
const router = Router();
import { register, signin } from "../controllers/authController.js";

router.post("/register", register);
router.post("/signin", signin);

console.log("hihihi")

export default router;
