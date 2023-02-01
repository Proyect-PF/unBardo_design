'use strict';
import { Model } from "sequelize";

interface interUser {
  firstName: string,
    lastName:string,
    email: string,
    color:string
}

export default (sequelize:any, DataTypes:any) => {
  class Users extends Model implements Model<interUser>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    firstName!: string
    lastName!:string
    email!:string
    color!:string

    static associate(models:any) {
      // define association here
      //_id_
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