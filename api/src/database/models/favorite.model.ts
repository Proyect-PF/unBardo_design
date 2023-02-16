import Sequelize, { Model, DataTypes } from "sequelize";

interface FavoritesAttributes {
  id: number;
  id_user: number;
  products_id: number[];
}

export default (sequelize:any, DataTypes:any) => {
  class Favorites extends Model implements Model<FavoritesAttributes> {
    public id!: number;
    public id_user!: number;
    public products_id!: number[];
    static associate(models: any) {}

  }

  Favorites.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      products_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );

  return Favorites;
};
