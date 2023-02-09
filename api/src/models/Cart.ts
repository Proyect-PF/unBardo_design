'use strict';

import { Model } from "sequelize";

interface CartAttributes {
    total: number;
    quantity: number;
  }

export default (sequelize:any, DataTypes:any) => {
    class Cart extends Model implements Model<CartAttributes>{
        total!: number;
        quantity!: number;

        static associate(models:any) {
            models.Cart.belongsTo(models.Product, {foreignKey: "id_product"})
        }


    }
    Cart.init({
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
}