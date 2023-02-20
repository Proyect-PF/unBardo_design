import Sequelize, { Model, DataTypes } from "sequelize";

interface ShipmentAttributes {
  id: number;
  minus100: number;
  minus500: number;
  minus1000: number;
  plus1000: number;
}

export default (sequelize:any, DataTypes:any) => {
  class Shipments extends Model implements Model<ShipmentAttributes> {
    public id!: number;
    public minus100!: number;
    public minus500!: number;
    public minus1000!: number;
    public plus1000!: number;
    static associate(models: any) {}

  }

  Shipments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      minus100: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      minus500: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      minus1000: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      plus1000: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Shipments",
    }
  );

  Shipments.afterSync(async () => {
    const count = await Shipments.count();
    if (count === 0) {
      await Shipments.create({
        minus100: 1,
        minus500: 1,
        minus1000: 1,
        plus1000: 1,
      });
    }
  });

  return Shipments;
};
