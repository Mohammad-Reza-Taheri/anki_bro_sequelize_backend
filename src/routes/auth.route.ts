import express from "express";
import { register, login, verify_token } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify_token", verify_token);
// router.get("/protected", authenticateToken, (req, res) => {
//     res.json({ message: "You accessed a protected route!", user: req.user });
// });

export default router;