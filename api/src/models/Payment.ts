'use strict';
import { Model } from "sequelize";

export default (sequelize:any, DataTypes:any) => {
    class Payment extends Model {
        static associate(models:any) {

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