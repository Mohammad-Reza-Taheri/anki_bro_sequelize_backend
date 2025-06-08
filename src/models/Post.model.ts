// import { Model, DataTypes, Optional } from 'sequelize';
// import { Sequelize } from 'sequelize';
// import { ModelStatic } from 'sequelize';

// interface PostAttributes {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// interface PostInstance extends Model<PostAttributes, PostCreationAttributes>, PostAttributes {
//   // برای روابط آینده
// }

// interface PostStatic extends ModelStatic<PostInstance> {
//   associate?: (models: any) => void;
// }

// const Post = (sequelize: Sequelize) => {
//   const PostModel = sequelize.define<PostInstance, PostAttributes>(
//     'Post',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [3, 100]
//         }
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [10, 5000]
//         }
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//       }
//     },
//     {
//       tableName: 'posts',
//       timestamps: true,
//       indexes: [
//         {
//           fields: ['userId'] // ایندکس برای جستجوی کارآمد
//         }
//       ]
//     }
//   );

//   // متد initialize برای استفاده در فایل index.ts
//   PostModel.initialize = (sequelize: Sequelize) => {
//     return Post(sequelize);
//   };

//   // متد associate برای تعریف روابط
//   PostModel.associate = (models: any) => {
//     PostModel.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'author',
//       onDelete: 'CASCADE'
//     });
//   };

//   return PostModel;
// };

// export default Post;


///////////////////

// import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

// interface PostAttributes {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// interface PostInstance extends Model<PostAttributes, PostCreationAttributes>, PostAttributes {}

// const definePostModel = (sequelize: Sequelize) => {
//   const PostModel = sequelize.define<PostInstance>(
//     'Post',
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [3, 100],
//         },
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         validate: {
//           notEmpty: true,
//           len: [10, 5000],
//         },
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id',
//         },
//       },
//     },
//     {
//       tableName: 'posts',
//       timestamps: true,
//       indexes: [{ fields: ['userId'] }],
//     }
//   );

//   // Define associations in a separate function
//   PostModel.associate = (models: any) => {
//     PostModel.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'author',
//       onDelete: 'CASCADE',
//     });
//   };

//   return PostModel;
// };

// export default definePostModel;

///////////////////////////


import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface PostAttributes {
  id?: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> {
  static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
    });
  }
}

 const definePostModel = (sequelize: Sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: true, len: [3, 100] },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true, len: [10, 5000] },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
    },
    {
      sequelize,
      tableName: 'posts',
      timestamps: true,
    }
  );

  return Post;
};

export default definePostModel