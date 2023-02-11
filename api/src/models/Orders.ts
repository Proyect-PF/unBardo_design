"use strict";

import Sequelize, { Model, DataTypes } from "sequelize";

interface OrdersAttributes {
    id: number;
    id_user: number;
    status: string;
    total_amount: number;
}

export default (sequelize: Sequelize.Sequelize) => {
    class Orders extends Model<OrdersAttributes> {
        public id!: number;
        public id_user!: number;
        public status!: string;
        public total_amount!: number;

        public static associate(models: any) {
            Orders.belongsToMany(models.Product, {
                through: models.OrderProducts,
                foreignKey: "id_order",
                as: "products",
            });
            Orders.belongsTo(models.Users, { foreignKey: "id_user", as: "users" });
        }
    }

    Orders.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            total_amount: {
                type: DataTypes.DECIMAL(10, 2),
            },
        },
        {
            sequelize,
            modelName: "Orders",
        }
    );

    return Orders;
};
