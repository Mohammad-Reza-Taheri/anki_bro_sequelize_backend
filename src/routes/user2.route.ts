import express from 'express'
import { UserController } from '../controllers/user2.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get("/", authenticateToken,UserController.getAllUsers);
// router.get("/", UserController.getAllUsers);
// router.post("/", UserController.createUser);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);


export default router;