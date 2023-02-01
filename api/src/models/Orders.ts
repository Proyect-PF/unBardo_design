'use strict';

import {
  Model
} from 'sequelize';

interface OrdersAttributes {
  id: number;
  total_amount: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Orders extends Model<OrdersAttributes> 
    implements OrdersAttributes{
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
        through: 'ProjectAssignments'
      })
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
      type: DataTypes.NUMBER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Orders;
};