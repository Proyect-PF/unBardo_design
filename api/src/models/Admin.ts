

import sequelize, { Model } from "sequelize";
import db from ".";
export default  (sequelize:any, DataTypes:any)=>{
    
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The models/index file will call this method automatically.
         */
        
        public static async findByNameAll(username : string | undefined ) {
            if (username){
                const foundName = await Admin.findAll({
                    where: {
                        username
                    }
                })
                
                return foundName
            }else{
                const arrUsers = await Admin.findAll()
                return arrUsers
            }
        }
        
        
        static associate(models:any) {
// define association here
            models.Admin.hasMany(models.Product, { foreignKey: "adminId" });

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

