const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Profile = sequelize.define(
  'Profile',
  {
    first_name: {
      type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
},
{
  timestamps: false
},);

export default Profile;