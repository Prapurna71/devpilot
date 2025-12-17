const axios = require("axios");
const ApiEndpoint = require("../models/ApiEndpoint");
const ApiLog = require("../models/ApiLog");

const monitorApis = async () => {
  const apis = await ApiEndpoint.findAll();

  for (const api of apis) {
    const start = Date.now();

    try {
      const response = await axios.get(api.url, { timeout: 5000 });
      const responseTime = Date.now() - start;

      await ApiLog.create({
        apiId: api.id,
        statusCode: response.status,
        responseTime,
        isUp: true
      });

    } catch (err) {
      const responseTime = Date.now() - start;

      await ApiLog.create({
        apiId: api.id,
        statusCode: err.response?.status || 0,
        responseTime,
        isUp: false
      });
    }
  }
};

module.exports = monitorApis;
