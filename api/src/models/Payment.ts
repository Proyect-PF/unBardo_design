'use strict';
import { Model } from "sequelize";

export default (sequelize:any, DataTypes:any) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        static associate(models:any) {
// define association here
        }
    }
    Payment.init({
        orderId: {
            type: DataTypes.INTEGER,
        },
        paymentMethod: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.DECIMAL,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};