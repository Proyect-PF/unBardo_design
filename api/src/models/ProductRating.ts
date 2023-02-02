'use strict';
const { Model } = require('sequelize');

export default (sequelize: any, DataTypes: any) => {
    class ProductRating extends Model {
        static associate(models: any) {}
    }

    ProductRating.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
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
        modelName: 'ProductRating',
    });

    return ProductRating;
};
