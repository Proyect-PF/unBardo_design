

import { Sequelize } from "sequelize";
import { Model } from "sequelize";



export default (sequelize:any, DataTypes:any)=> {
    
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        
        static associate(models:any) {
// define association here
        }
    }
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};