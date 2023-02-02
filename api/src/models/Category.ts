'use strict';

import { Model } from "sequelize";

interface CategoryAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Category extends Model implements Model<CategoryAttributes>{
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        name!: string;

        static associate(models:any) {
        // define association here
        models.Category.hasMany(models.Product, { foreignKey: 'categoryId' });
        models.Category.hasMany(models.ProductCategory, { foreignKey: 'categoryId' });
        }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};



