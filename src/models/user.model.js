import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull:false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user'
    },
},
{
  timestamps: false
},);

export default User;