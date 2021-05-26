const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tracker", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
    url: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false,
    },
  });
};
