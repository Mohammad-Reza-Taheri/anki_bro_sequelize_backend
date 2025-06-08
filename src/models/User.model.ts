// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../config/database';

// interface UserAttributes {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// class User extends Model<UserAttributes> implements UserAttributes {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   },
//   {
//     sequelize,
//     tableName: 'users',
//     timestamps: true,
//     defaultScope: {
//       attributes: { exclude: ['password'] }
//     },
//     scopes: {
//       withPassword: {
//         attributes: { include: ['password'] }
//       }
//     }
//   }
// );

// export default User;

////////////////////version 2///////////////////

// import { Model, DataTypes, Optional } from 'sequelize';
// import { Sequelize } from 'sequelize';
// import { ModelStatic } from 'sequelize';

// interface UserAttributes {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
//   // برای روابط
//   posts?: PostInstance[];
// }

// interface UserStatic extends ModelStatic<UserInstance> {
//   associate?: (models: any) => void;
// }

// const User = (sequelize: Sequelize) => {
//   const UserModel = sequelize.define<UserInstance, UserAttributes>(
//     'User',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [3, 50]
//         }
//       },
//       email: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//           notEmpty: true
//         }
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [8, 100]
//         }
//       }
//     },
//     {
//       tableName: 'users',
//       timestamps: true,
//       defaultScope: {
//         attributes: { exclude: ['password'] }
//       },
//       scopes: {
//         withPassword: {
//           attributes: { include: ['password'] }
//         },
//         withPosts: {
//           include: ['posts']
//         }
//       }
//     }
//   );

//   // متد initialize برای استفاده در فایل index.ts
//   UserModel.initialize = (sequelize: Sequelize) => {
//     return User(sequelize);
//   };

//   // متد associate برای تعریف روابط
//   UserModel.associate = (models: any) => {
//     UserModel.hasMany(models.Post, {
//       foreignKey: 'userId',
//       as: 'posts'
//     });
//   };

//   return UserModel;
// };

// export default User;


/////////////////////////////


import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  static associate(models: any) {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
  }
}

 const defineUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
        validate: { notEmpty: true, len: [8, 100] },
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  return User;
};

export default defineUserModel

