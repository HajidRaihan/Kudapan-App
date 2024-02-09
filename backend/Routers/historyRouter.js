const express = require("express");
const router = express.Router();
const { getHistory } = require("../controller/historyContoller");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.get("/get/:userId", verifyUser("customer"), getHistory);

module.exports = router;
