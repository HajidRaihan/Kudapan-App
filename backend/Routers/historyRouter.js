const express = require("express");
const router = express.Router();
const { getHistory, deleteHistory } = require("../controller/historyContoller");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.get("/get/:userId", getHistory); // done
router.delete("/delete/:userId", deleteHistory);

module.exports = router;
