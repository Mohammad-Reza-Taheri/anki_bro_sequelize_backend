import User from "./User2.model";
import Category from "./Category.model";
import Card from "./Card.model";

export const setupRelations = () => {
    //category
    User.hasMany(Category, {
        foreignKey: 'user_id',
        as: 'categories'
    });

    Category.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
    })

    //card
    User.hasMany(Card, {
        foreignKey: 'user_id',
        as: 'cards'
    });

    Card.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
    })

    //card & category
      Category.hasMany(Card, {
    foreignKey: 'category_id',
    as: 'cards',
  });

  Card.belongsTo(Category, {
    foreignKey: 'category_id',
    // onDelete: 'CASCADE',
    // onUpdate: 'CASCADE',
    as: 'category',
  });

    // Category.hasMany(Card, {
    //     foreignKey: 'category_id',
    //     as: 'cards'
    // });

    // Card.belongsTo(Category, {
    //     foreignKey: 'category_id',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //     as: 'category'
    // })
}