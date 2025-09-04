const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Article = sequelize.define(
  'Article',
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT(50),
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