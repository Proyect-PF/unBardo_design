//'use strict';

import Sequelize, { Model } from "sequelize";

interface PorductAttributes {
  id: number;
  name: string;
  description: Text;
  size: string;
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
  //class Product extends Model implements Model<PorductAttributes>{
    class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: Text;
    size!: string;
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
      models.Product.hasMany(models.OrderDetail, { foreignKey: 'productId' });
      models.Product.hasMany(models.Image, { foreignKey: 'productId' });
      models.Product.hasMany(models.ProductRating, { foreignKey: 'productId' });
      models.Product.hasMany(models.ProductCategory, { foreignKey: 'productId' });
      models.Product.hasMany(models.ProductColour, { foreignKey: 'productId' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
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
    size: {
      //type: Sequelize.ENUM("XS", "S", "M", "L", "XL"),
      type: DataTypes.STRING,
      allowNull: false,
      //defaultValue: "XS"
    },
    show_in_shop: {
      //type: Sequelize.ENUM("si", "no"),
      type: DataTypes.STRING,
      allowNull: false,
      //defaultValue: "no"
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

