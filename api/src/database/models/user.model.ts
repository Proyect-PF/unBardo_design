import { Model } from "sequelize";
import bcrypt from "bcryptjs"
import { TypeUser } from "../../types";


export default (sequelize:any, DataTypes:any) => {
  class Users extends Model implements Model<TypeUser>{
    
    fullname!:string
    firstName!: string
    lastName!:string
    email!:string
    password!:string

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
    public static async getUserById(id: number) {
      return await this.findByPk(id);
    }
    public static async getAllUsers() {
      return await Users.findAll();
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
      allowNull: true
    },
    news_letter: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    },
    google_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps:true
  });
  return Users;
};
