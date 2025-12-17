const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
sequelize.authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB error:", err));

// sync tables
sequelize.sync()
  .then(() => console.log("Tables synced"))
  .catch(err => console.log(err));

const cron = require("node-cron");
const monitorApis = require("./jobs/monitorApis");

// Run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("Running API monitor job...");
  monitorApis();
});


// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("DevPilot API running");
});
const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

const logRoutes = require("./routes/logRoutes");
app.use("/api", logRoutes);


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
