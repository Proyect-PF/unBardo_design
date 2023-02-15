import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Image extends Model {
    static associate(models: any) {
      Image.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
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
