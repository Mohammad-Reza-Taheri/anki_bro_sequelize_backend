import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import Category from './Category.model';
import User from './User2.model';
export interface ICard {
    card_id?: number;
    title: string;
    description: string;
    // passed_easy?: number;
    // passed_good?: number;
    // passed_hard?: number;
    // passed_wrong?: number;
    rate?:number;
    category_id: number;
    updatedAt?:Date;
    createdAt?:Date;
    user_id?: number;
}

interface ICreateCard extends Optional<ICard, 'card_id'>{}

class Card extends Model<ICard, ICreateCard> {
    // declare cat_id: number;
    // declare title: string;
    // declare description: string;
    // declare passed_easy: number;
    // declare passed_good: number;
    // declare passed_hard: number;
    // declare passed_wrong: number
    // declare readonly category_id: number;
    // declare readonly user_id: number;

    public cat_id!: number;
    public title!: string;
    public description!: string;
    public rate!: number;
    // public passed_easy!: number;
    // public passed_good!: number;
    // public passed_hard!: number;
    // public passed_wrong!: number;
    public updatedAt!:Date;
    public createdAt!:Date;
    declare readonly category_id: number;
    declare readonly user_id: number;
}

Card.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { notEmpty: true, len: [3, 50] },

        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: { notEmpty: true, len: [3, 500] },

        },
        rate:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        // passed_easy: {
        //     type: DataTypes.TINYINT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     // validate: { min: 0, max: 50 },

        // },
        // passed_good: {
        //     type: DataTypes.TINYINT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     // validate: { min: 0, max: 50 }
        // },
        // passed_hard: {
        //     type: DataTypes.TINYINT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     // validate: { min: 0, max: 50 }
        // },
        // passed_wrong: {
        //     type: DataTypes.TINYINT,
        //     allowNull: false,
        //     defaultValue: 0,
        //     validate: { min: 0, max: 10 }
        // },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: 'cat_id'
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
        },
         createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Automatically sets the current timestamp
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
        timestamps:true,
        indexes: [
            {
                unique: true,
                fields: ["title", "category_id"],
                name: 'unique_title_category_id'
            }
        ]
    }
)

export default Card;