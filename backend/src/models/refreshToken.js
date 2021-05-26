const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("refreshToken", {
    token: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    }
  });
};
