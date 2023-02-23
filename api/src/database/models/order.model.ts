import Sequelize, { Model, DataTypes } from "sequelize";

interface OrdersAttributes {
  id: number;
  id_user: number;
  status: string;
  payment_id: bigint;
  dispatched: boolean;
  track_id: string;
}

export default (sequelize: Sequelize.Sequelize) => {
  class Orders extends Model implements Model<OrdersAttributes> {
    public id!: number;
    public id_user!: number;
    public status!: string;
    public payment_id!: bigint;
    public dispatched!: boolean;
    public track_id!: string;

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
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      dispatched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      track_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );

  return Orders;
};
