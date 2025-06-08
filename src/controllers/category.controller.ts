import { Request, Response } from 'express'
import CategoryService from "../services/category.service";
import { AuthRequest } from '../utils/express';


class CategoryController {

    static async getAllCategories(req: AuthRequest, res: Response) {
        try {
            const categories = await CategoryService.getAllCategories(Number(req.userData.id))
            res.json({ message: "successfully fetched!", categories: categories })
        } catch (err) {
            res.status(500).json('server error in category.controller')
        }
    }


    static async createCategory(req: AuthRequest, res: Response) {
        try {
            const { cat_name } = req.body
            const { id } = req.userData
            // console.log("user_id" + JSON.stringify(req.userData.id))
            //testing
            await CategoryService.createCategory(cat_name, Number(id));
            res.json("category successfully created.")
        } catch (err) {
            res.status(500).json('server error in category.controller')
        }
    }


    static async updateCategory(req: Request, res: Response) {
        try {
            console.log("update cat is starting")
            const { cat_id } = req.params
            const { cat_name } = req.body
            //testing
            await CategoryService.updateCategory(Number(cat_id), cat_name);

            res.json("category successfully updated.")
        } catch (err) {
            res.status(500).json('server error in category.controller')
        }
    }


    static async deleteCategory(req: Request, res: Response) {
        try {
            const { cat_id } = req.params
            //testing
            console.log('here' + cat_id)
            const deleted = await CategoryService.deleteCategory(Number(cat_id));
            console.log("here2")
            res.json("category successfully deleted." + deleted)
        } catch (err) {
            res.status(500).json('server error in category.controller del')
        }
    }

}
export default CategoryController