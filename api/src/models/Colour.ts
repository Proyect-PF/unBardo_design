'use strict';

import { Model } from "sequelize";

interface ColourAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Colour extends Model implements Model<ColourAttributes>{
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        name!: string;
        
        static associate(models:any) {
        // define association here
            models.Colour.hasMany(models.ProductColour, { foreignKey: 'colourId' });
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