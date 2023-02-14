'use strict';
import { Model } from "sequelize";

export default (sequelize:any, DataTypes:any) => {
  class Role extends Model {

    static associate(models:any) {
      Role.hasMany(models.Users, {
        foreignKey: 'id_role',
    } )
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps:true
  });
  return Role;
};

