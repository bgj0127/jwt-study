const express = require("express");
const userDB = require("../src/constants/userInfo");
const { generateAccessToken, generateRefreshToken, recreateAccessToken } = require("../src/controllers/jwt");
const { verifyAccessToken, verifyRefreshToken } = require("../src/middlewares/verifyToken");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Router");
});

// 회원가입
router.get("/join", (req, res) => {});

// 로그인
router.get("/login", (req, res) => {
  const { id, pw } = userDB[0];
  console.log(userDB[0].id);

  // 로그인 성공했을 때 가정한거임. 수정해야됨
  if (true) {
    const payload = {
      userId: id,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    // 이거 하려면 https로 만들어야 가능.
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 14,
    // });

    // 일단 refreshToken도 응답으로 넘겨주자. 기능구현은 해야되니
    res.status(200).json({ message: "로그인 성공", accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).json({ message: "로그인 실패" });
  }
});

router.get("/refresh", verifyRefreshToken, (req, res) => {
  console.log(req.decoded);

  const payload = {
    userId: req.decoded.userId,
  };

  const accessToken = generateAccessToken(payload);

  res.status(200).json({ accessToken: accessToken });
});

// 로그아웃
router.get("/logout", (req, res) => {});

module.exports = router;
