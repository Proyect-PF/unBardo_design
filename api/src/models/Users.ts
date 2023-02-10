'use strict';
import { Model } from "sequelize";
import bcrypt from "bcryptjs"


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

    /**
     * Method encryptPassword
     * @param password que se va a encriptar
     */
    public static async encryptPassword (password:string) {
      const salt = await bcrypt.genSalt(5)
      return await bcrypt.hash(password, salt)

    }
    /**
     * Method comparePassword()
     * @param password Password actual que el usuario tiene guardado en la base de datos
     * @param receibedPasswor Contraseña actual que el usuario intenta comparar
     */
    public static async comparePassword (password:string, receibedPassword:string) {
      //retorna true si coinciden las contraseñas o false si no coinciden 
      return await bcrypt.compare(password, receibedPassword)
    }


    static associate(models: any) {
      Users.hasMany(models.Orders, {
        foreignKey: 'id_user',
        as: 'orders'
      });

      Users.belongsTo(models.Role, {foreignKey: "id_role"})
    }
  }
  Users.init({
    fullname: {
      type:  DataTypes.STRING,
      allowNull: false,
        },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Users',
    timestamps:true
  });
  return Users;
};