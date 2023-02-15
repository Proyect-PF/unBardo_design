import Sequelize, { Model } from "sequelize";
import { TypeProduct } from "../../types";


//TODO: show_in_shop se utiliza para el borrado lógico, toma valores true y false
//TODO: stock es la cantidad disponible del producto, si el valor es cero debe mostrar OUT OF STOCK
export default (sequelize:any, DataTypes:any) => {
  //class Product extends Model implements Model<PorductAttributes>{
    class Product extends Model implements Model<TypeProduct> {
      static associate(models: any) {

        Product.hasMany(models.Image, {
          foreignKey: 'productId',
          as: 'images',
        })
        Product.belongsToMany(models.Orders, {
          onDelete: "SET NULL",
          through: models.OrderProducts,
          foreignKey: 'id_product',
          as: 'orders'
        });

      }


    }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    image: {
      type: DataTypes.STRING,
       allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      // allowNull: false
    },
    S:{
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    M:{
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    L:{
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    XL:{
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    show_in_shop: {
      //type: Sequelize.ENUM("si", "no"),

      type: DataTypes.BOOLEAN,
      // allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    promotional_price: { // Se va a usar
      type: DataTypes.INTEGER,
      allowNull: true
    },
    promotion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

