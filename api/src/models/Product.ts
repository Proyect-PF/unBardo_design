'use strict';
const {
  Model
} = require('sequelize');

export default (sequelize:any, DataTypes:any) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  Product.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

