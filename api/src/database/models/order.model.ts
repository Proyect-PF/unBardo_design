import Sequelize, { Model, DataTypes } from "sequelize";

interface OrdersAttributes {
  id: number;
  id_user: number;
  status: string;
  payment_id: number;
  dispatched: boolean;
}

export default (sequelize: Sequelize.Sequelize) => {
  class Orders extends Model implements Model<OrdersAttributes> {
    public id!: number;
    public id_user!: number;
    public status!: string;

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
      payment_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dispatched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );

  return Orders;
};
