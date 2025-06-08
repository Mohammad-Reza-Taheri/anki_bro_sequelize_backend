import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User2.model';
interface ICategory {
    cat_id?: number;
    cat_name: string;
    cat_cards_count?: number;
    user_id: number;
}

interface ICreateCategory extends Optional<ICategory, 'cat_id'> { }

class Category extends Model<ICategory, ICreateCategory> {
    public cat_id!: number;
    public cat_name!: string;
    public cat_cards_count!: User;
    declare readonly user_id: number;
}

Category.init(
    {
        cat_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cat_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { notEmpty: true, len: [3, 50] },

        },
        cat_cards_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        indexes:[
            {
                unique:true,
                fields:["cat_name","user_id"],
                name:'unique_cat_name_user_id'
            }
        ]
    }
)

export default Category;