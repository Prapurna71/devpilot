const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ApiLog = sequelize.define("ApiLog", {
  apiId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  statusCode: {
    type: DataTypes.INTEGER
  },
  responseTime: {
    type: DataTypes.INTEGER // milliseconds
  },
  isUp: {
    type: DataTypes.BOOLEAN
  }
});

module.exports = ApiLog;
