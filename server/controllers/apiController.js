const ApiEndpoint = require("../models/ApiEndpoint");
const ApiLog = require("../models/ApiLog");

// ADD API (protected)
exports.addApi = async (req, res) => {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL required" });
    }

    const api = await ApiEndpoint.create({
      name,
      url,
      userId: req.userId
    });

    res.status(201).json(api);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY APIS (protected)
exports.getMyApis = async (req, res) => {
  try {
    const apis = await ApiEndpoint.findAll({
      where: { userId: req.userId }
    });

    // Fetch latest log for each API
    const apisWithStatus = await Promise.all(
      apis.map(async (api) => {
        const latestLog = await ApiLog.findOne({
          where: { apiId: api.id },
          order: [["createdAt", "DESC"]]
        });

        return {
          ...api.toJSON(),
          latestLog: latestLog ? latestLog.toJSON() : null
        };
      })
    );

    res.json(apisWithStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE API (protected)
exports.deleteApi = async (req, res) => {
  try {
    const { id } = req.params;

    // Find API and verify ownership
    const api = await ApiEndpoint.findOne({
      where: { 
        id,
        userId: req.userId 
      }
    });

    // If not found or not owned by user, return 404
    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }

    // Delete related logs first
    await ApiLog.destroy({
      where: { apiId: id }
    });

    // Delete the API
    await api.destroy();

    res.json({ message: "API deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
