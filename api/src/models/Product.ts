'use strict';

import { Model } from "sequelize";

enum CredentialWaist{
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL"
}

enum CredentialShow{
  True = "True",
  False = "False"
}

interface PorductAttributes {
  id: number;
  name: string;
  description: Text;
  waist: string;
  price: number;
  promotional_price: number;
  video: string;
  show_in_shop: string;
  stock: number;
  weight: number;
  width: number;
  height: number;
  length: number;
  SKU: string;
  barcode: string;
}
//TODO: show_in_shop se utiliza para el borrado lógico, toma valores true y false
//TODO: stock es la cantidad disponible del producto, si el valor es cero debe mostrar OUT OF STOCK
export default (sequelize:any, DataTypes:any) => {
  class Product extends Model implements Model<PorductAttributes>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: Text;
    waist!: string;
    price!: number;
    promotional_price!: number;
    video!: string;
    show_in_shop!: string;
    stock!: number;
    weight!: number;
    width!: number;
    height!: number;
    length!: number;
    SKU!: string;
    barcode!: string;

    static associate(models:any) {
      // define association here
      // Product.belongsToMany(models.Category, {
        // through: 'Products_Categories'
        // })
        // Product.belongsToMany(models.Color, {
        //   through: 'Products_Colors'
        // })
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    waist: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    show_in_shop: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    promotional_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: true
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

