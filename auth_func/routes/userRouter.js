const express = require("express");
const { verifyAccessToken } = require("../src/middlewares/verifyToken");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Router");
});

// jwt 미들웨어 잘 동작하는 확인하려고 만든 라우터
router.get("/users", verifyAccessToken, (req, res) => {
  res.json({ message: "jwt 검증 잘 되네요" });
});

module.exports = router;
