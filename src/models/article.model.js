import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Article = sequelize.define(
  'Article',
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: { type: DataTypes.STRING(500) },
      status: {
      type: DataTypes.ENUM("published", "archived"),
      defaultValue: "published",
    },
},
{
  timestamps: false
},);

export default Article;