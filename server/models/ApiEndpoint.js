const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ApiEndpoint = sequelize.define("ApiEndpoint", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = ApiEndpoint;
