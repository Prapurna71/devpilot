const ApiEndpoint = require("../models/ApiEndpoint");
const ApiLog = require("../models/ApiLog");

// GET logs for a specific API (protected)
exports.getApiLogs = async (req, res) => {
  try {
    const apiId = req.params.id;

    // 1️⃣ Check API ownership
    const api = await ApiEndpoint.findOne({
      where: {
        id: apiId,
        userId: req.userId
      }
    });

    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }

    // 2️⃣ Fetch logs
    const logs = await ApiLog.findAll({
      where: { apiId },
      order: [["createdAt", "DESC"]],
      limit: 20
    });

    // 3️⃣ Compute basic analytics
    const totalChecks = logs.length;
    const upChecks = logs.filter(l => l.isUp).length;

    const avgResponseTime =
      totalChecks === 0
        ? 0
        : Math.round(
            logs.reduce((sum, l) => sum + l.responseTime, 0) / totalChecks
          );

    res.json({
      api: {
        id: api.id,
        name: api.name,
        url: api.url
      },
      summary: {
        totalChecks,
        upChecks,
        uptimePercentage:
          totalChecks === 0
            ? "0%"
            : `${Math.round((upChecks / totalChecks) * 100)}%`,
        avgResponseTime
      },
      logs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
