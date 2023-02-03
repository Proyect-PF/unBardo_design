"use strict";
const { Model } = require("sequelize");

export default (sequelize: any, DataTypes: any) => {
  class OrderDetail extends Model {
    static associate(models: any) {
      // // define association here
      //TODO Un detalle de pedido pertenece a un solo pedido (Order Detail belongs to Order)
      models.OrderDetail.belongsTo(models.Orders);
    }
  }

  OrderDetail.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );

  return OrderDetail;
};
