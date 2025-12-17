const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getApiLogs } = require("../controllers/logController");

router.get("/endpoints/:id/logs", auth, getApiLogs);

module.exports = router;
