"use strict";

import Product from "./Product";

import { Model } from "sequelize";


export default (sequelize: any, DataTypes: any) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      //TODO Una imagen pertenece a un solo producto (Image belongs to Product)
      models.Image.belongsTo(models.Product, {
        foreignKey: 'productId'
      });    }
  }
  Image.init(
    {
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
