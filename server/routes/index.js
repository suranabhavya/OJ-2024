const express = require("express");

const authRouter = require("./authRoute");
// const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use("/auth", authRouter);
// router.use("/problems", authenticateToken, problemRouter);

module.exports = router;