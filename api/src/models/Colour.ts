'use strict';
const {
    Model
} = require('sequelize');

export default (sequelize:any, DataTypes:any) => {
    class Colour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        static associate(models:any) {
// define association here
        }
    }
    Colour.init({
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Colour',
    });
    return Colour;
};