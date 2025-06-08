import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware';
import CategoryController from '../controllers/category.controller';

const router = express.Router();

router.get("/",authenticateToken, CategoryController.getAllCategories);
router.post("/",authenticateToken, CategoryController.createCategory);
router.put("/:cat_id",authenticateToken, CategoryController.updateCategory);
router.delete("/:cat_id",authenticateToken, CategoryController.deleteCategory);


export default router;