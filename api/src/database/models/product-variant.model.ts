import Sequelize, { Model } from "sequelize";
interface ProductVariantAttributes {
    id: number;
    size: string;
    color: string;
    stock: number;
    price: number;
    quantity: number;
    SKU: string;
    release_date: Date;
}
export default (sequelize: any, DataTypes: any) => {
    class ProductVariant extends Model {
        id!: number;
        size!: string;
        color!: string;
        stock!: number;
        price!: number;
        quantity!: number;
        SKU!: string;
        release_date!: Date;

        static associate(models: any) {
            ProductVariant.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product',
            });
        }
    }

    ProductVariant.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SKU: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'ProductVariant',
    });

    return ProductVariant;
};
