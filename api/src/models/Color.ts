'use strict';

import { Model } from "sequelize";

interface ColorAttributes {
    name: string;
  }

export default (sequelize:any, DataTypes:any) => {
    class Color extends Model implements Model<ColorAttributes>{

        name!: string;
        
        static associate(models:any) {

        }
    }
    Color.init({
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
        modelName: 'color',
    });
    return Color;
};