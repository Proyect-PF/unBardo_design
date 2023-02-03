'use strict';
import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
    class ProductColour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        static associate(models: any) {
// define association her
            models.Users.hasMany(models.Orders, { foreignKey: 'userId' });
            models.Users.hasMany(models.ProductRating, { foreignKey: 'userId' });


        }
    }
    ProductColour.init({
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colourId: {
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
        modelName: 'ProductColour',
    });
    return ProductColour;
};