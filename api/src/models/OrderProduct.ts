"use strict";

import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
    class OrderProducts extends Model {
        static associate(models: any) {
            OrderProducts.belongsTo(models.Orders, {
                foreignKey: "orderId",
                as: "orders",
            });
            OrderProducts.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "products",
            });
        }
    }

    OrderProducts.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "OrderProducts",
        }
    );

    return OrderProducts;
};
