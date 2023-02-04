'use strict';

import { Model } from "sequelize";

interface ColourAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Colour extends Model implements Model<ColourAttributes>{

        name!: string;
        
        static associate(models:any) {

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