'use strict';

import {
  Model
} from 'sequelize';

interface OrdersAttributes {
  id: number;
  total_amount: number;
  status: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Orders extends Model 
    implements Model<OrdersAttributes>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    total_amount!: number;
    status!: string;

    static associate(models: any) {
      // define association here
      Orders.belongsToMany(models.Product, {
        through: 'Orders_Products'
      })
      models.Orders.belongsTo(models.Payment, { foreignKey: 'orderId' });
      models.Orders.hasMany(models.OrderDetail, { foreignKey: 'orderId' });
    }
  };
  Orders.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};