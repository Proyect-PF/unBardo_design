"use strict";

import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
    class OrderProducts extends Model {
        static associate(models: any) {
            OrderProducts.belongsTo(models.Orders, {
                foreignKey: "id_order",
                as: "orders",
            });
            OrderProducts.belongsTo(models.Product, {
                foreignKey: "id_product",
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
            id_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
            sizes: {
                type: DataTypes.JSON,
            }
        },
        {
            sequelize,
            modelName: "OrderProducts",
        }
    );

    return OrderProducts;
};
