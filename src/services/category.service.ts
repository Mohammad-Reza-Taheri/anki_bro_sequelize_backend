import Category from '../models/Category.model';
class CategoryService {
    static async createCategory(cat_name: string, user_id: number) {
        return await Category.create({ cat_name, cat_cards_count: 0, user_id: user_id })
    }

    static async getAllCategories(user_id: number) {
        return await Category.findAll(
            { where: { user_id: user_id } }
        )
    }

    static async findCatIdByCatNameAndUserId(cat_name: string, user_id: number) {
        return await Category.findOne(
            { where: { cat_name, user_id }, attributes: ['cat_id'] }
        )
    }

    static async findCatNameByCatId(cat_id: number) {
        return await Category.findOne(
            { where: { cat_id }, attributes: ['cat_name'] }
        )
    }


    static async updateCategory(cat_id: number, cat_name: string) {
        return await Category.update(
            { cat_name },
            { where: { cat_id } }
        )
    }

    static async deleteCategory(cat_id: number) {
        console.log("in del cat" + cat_id)
        if (!cat_id) {
            throw new Error("Invalid category ID");
        }

        const deleted = await Category.destroy(
            { where: { cat_id } }
        )
        if (deleted === 0) {
            throw new Error("Category not found");
        }
        return deleted;

    }
}

export default CategoryService;