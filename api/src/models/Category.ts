'use strict';

import { Model } from "sequelize";

interface CategoryAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Category extends Model implements Model<CategoryAttributes>{
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



