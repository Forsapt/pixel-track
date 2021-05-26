const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("record", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
  });
};
