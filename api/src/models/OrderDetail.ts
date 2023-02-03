"use strict";
const { Model } = require("sequelize");

export default (sequelize: any, DataTypes: any) => {
  class OrderDetail extends Model {
    static associate(models: any) {
      // // define association here
      //TODO Un detalle de pedido pertenece a un solo pedido (Order Detail belongs to Order)
        {/*models.OrderDetail.belongsTo(models.Product, {
            foreignKey: 'productId'
        });
        models.OrderDetail.belongsTo(models.Orders, {
            foreignKey: 'orderId'
        });*/}
    }
  }

  OrderDetail.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );

  return OrderDetail;
};
