import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const articleTag = sequelize.define("articleTag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
},
{
timestamps: false
},);

export default articleTag;