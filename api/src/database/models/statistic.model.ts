import { Model, DataTypes } from "sequelize";
import Sequelize from "sequelize";

interface StatisticsAttributes {
    id: number;
    action_type: string;
    id_user: number;
    id_product: number;
    id_order: number;
}

export default (sequelize: Sequelize.Sequelize) => {
    class Statistics extends Model<StatisticsAttributes> {
        public id!: number;
        public action_type!: string;
        public action_date!: Date;
    }

    Statistics.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            action_type: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_order: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

        },
        {
            sequelize,
            modelName: "Statistics",
        }
    );

    return Statistics;
};
