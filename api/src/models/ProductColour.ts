'use strict';
const {
    Model
} = require('sequelize');

export default (sequelize: any, DataTypes: any) => {
    class ProductColour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        static associate(models: any) {
// define association here
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