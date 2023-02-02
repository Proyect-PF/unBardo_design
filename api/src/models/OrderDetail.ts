'use strict';
const { Model } = require('sequelize');

export default (sequelize: any, DataTypes:any) => {
    class OrderDetail extends Model {
//         static associate(models) {
// // define association here
//         }
    }

    OrderDetail.init({
        orderId: {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'OrderDetail',
    });

    return OrderDetail;
};