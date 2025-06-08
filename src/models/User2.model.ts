import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
}

interface ICreateUser extends Optional<IUser, 'id'> { }

class User extends Model<IUser, ICreateUser> { 
    public id!:number
    public username!:string
    public email!:string
    public password!:string
}
// class User extends Model<IUser> implements Omit<IUser, "id"> {}


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: { notEmpty: true, len: [3, 50] },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { isEmail: true, notEmpty: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true, len: [8, 300] },
        },

    },
    {
        sequelize,
        tableName: "users2"
    }
)

export default User;

////////////////////////////////////

// import { Model, DataTypes, Optional } from 'sequelize';
// import sequelize from '../config/db';

// interface UserAttributes {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// class User extends Model<UserAttributes, UserCreationAttributes> {}

// User.init(
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     name: { type: DataTypes.STRING(50), allowNull: false },
//     email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//   },
//   {
//     sequelize,
//     tableName: 'users',
//     timestamps: true,
//   }
// );

// export default User;