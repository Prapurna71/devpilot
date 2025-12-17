const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addApi, getMyApis, deleteApi } = require("../controllers/apiController");

router.post("/endpoints", auth, addApi);
router.get("/endpoints", auth, getMyApis);
router.delete("/endpoints/:id", auth, deleteApi);

module.exports = router;
