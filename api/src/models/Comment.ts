'use strict';
const {
    Model
} = require('sequelize');

export default (sequelize:any, DataTypes:any) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models:any) {
            // define association here
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
