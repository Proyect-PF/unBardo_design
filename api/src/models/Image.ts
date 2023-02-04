"use strict";

import Product from "./Product";

import { Model } from "sequelize";


export default (sequelize: any, DataTypes: any) => {
  class Image extends Model {

    static associate(models: any) {

    }
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
