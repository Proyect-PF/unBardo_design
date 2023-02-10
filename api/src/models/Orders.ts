"use strict";

import {Model} from "sequelize";

interface OrdersAttributes {
  id: number;
  id_user: number;
  status: string;
}

export default (sequelize: any, DataTypes: any) => {
    class Orders extends Model {
        id!: number;
        id_user!: number;
        status!: string;

        static associate(models: any) {
            // define association here
            //TODO Un pedido pertenece a un solo usuario (Order belongs to User)
            // Un pedido tiene muchos detalles de pedido (Order has many Order Details)
            // Un pedido tiene un solo pago (Order has one Payment)
            // models.Orders.hasMany(models.Payment, { foreignKey: 'orderId' });
            // models.Orders.hasMany(models.OrderDetail, { foreignKey: 'orderId' });
            Orders.belongsToMany(models.Product, {
                through: models.OrderProducts,
                foreignKey: 'id_order',
                as: 'products'
            });
            Orders.belongsTo(models.Users, {foreignKey: 'id_user', as: 'users'});

        }
    }

    //implements Model<OrdersAttributes>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // id!: number;
    // total_amount!: number;
    // status!: string;

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
            }
        },
        {
            sequelize,
            modelName: "Orders",
        }
    );
    return Orders;
};

