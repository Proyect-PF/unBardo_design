'use strict';
import { Model } from "sequelize";

export default (sequelize:any, DataTypes:any) => {
    class Comment extends Model {

        static associate(models:any) {

        }
    }
    Comment.init({
        userId: {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
        text: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};
