import { Model, DataTypes } from "sequelize";
import Sequelize from "sequelize";

interface StatisticsAttributes {
    id: number;
    action_type: string;
    action_date: Date;
    user_id: number | null;
    product_id: number | null;
    cart_id: number | null;
    ip_address: string;
    user_agent: string;
    referrer: string | null;
    action_description: string | null;
    device_type: string | null;
    browser_name: string | null;
    browser_version: string | null;
    operating_system: string | null;
}

export default (sequelize: Sequelize.Sequelize) => {
    class Statistics extends Model<StatisticsAttributes> {
        public id!: number;
        public action_type!: string;
        public action_date!: Date;
        public user_id!: number | null;
        public product_id!: number | null;
        public cart_id!: number | null;
        public ip_address!: string;
        public user_agent!: string;
        public referrer!: string | null;
        public action_description!: string | null;
        public device_type!: string | null;
        public browser_name!: string | null;
        public browser_version!: string | null;
        public operating_system!: string | null;
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
            action_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            cart_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ip_address: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            user_agent: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            referrer: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            action_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            device_type: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            browser_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            browser_version: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            operating_system: {
                type: DataTypes.STRING(255),
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
