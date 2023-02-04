'use strict';
import { Model } from "sequelize";
import Product from './Product';
import Category from './Category';


export default (sequelize: any, DataTypes: any) => {
    class ProductCategory extends Model {
        static associate(models: any) {
            ProductCategory.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            });

            ProductCategory.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category'
            });
        }
    }

    ProductCategory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'ProductCategory',
    });

    return ProductCategory;
};
