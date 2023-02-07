'use strict';

import { Model } from "sequelize";

interface CategoryAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Category extends Model implements Model<CategoryAttributes>{
        name!: string;
            
        static associate(models:any) {
            models.Category.hasMany(models.Product, {foreignKey: "id_category"})
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



