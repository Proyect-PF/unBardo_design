import { Model, DataTypes } from 'sequelize';
import Sequelize from 'sequelize';

interface OrderProductsAttributes {
    id: number;
    id_order: number;
    id_product: number;
    sizes: { [size: string]: number };
    price_per_unit_at_purchase_time: number;
}


export default (sequelize: Sequelize.Sequelize) => {
    class OrderProducts extends Model<OrderProductsAttributes> {
        public static associate(models: any) {
            OrderProducts.belongsTo(models.Orders, {
                foreignKey: 'id_order',
                as: 'orders'
            });
            OrderProducts.belongsTo(models.Product, {
                foreignKey: 'id_product',
                as: 'products'
            });
        }

        public id!: number;
        public id_order!: number;
        public id_product!: number;
        public sizes!: { [size: string]: number };
        public price_per_unit_at_purchase_time!: number;
    }

    OrderProducts.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            id_order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Orders',
                    key: 'id'
                }
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Product',
                    key: 'id'
                }
            },
            sizes: {
                type: DataTypes.JSON
            },
            price_per_unit_at_purchase_time: {
                type: DataTypes.DECIMAL(10, 2)
            }
        },
        {
            sequelize,
            modelName: 'OrderProducts'
        }
    );

    return OrderProducts;
};
