import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
},
{
timestamps: false
},);

export default Tag;