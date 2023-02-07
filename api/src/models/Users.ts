'use strict';
import { Model } from "sequelize";

interface interUser {
  firstName: string,
    lastName:string,
    email: string,
    color:string
}

export default (sequelize:any, DataTypes:any) => {
  class Users extends Model{

    firstName!: string
    lastName!:string
    email!:string
    color!:string

    static associate(models: any) {
      Users.hasMany(models.Orders, {
        foreignKey: 'userId',
        as: 'orders'
      });
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    color:DataTypes.STRING,
    perritoColor: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};