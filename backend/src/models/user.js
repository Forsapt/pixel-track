const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    googleId: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  });
};
