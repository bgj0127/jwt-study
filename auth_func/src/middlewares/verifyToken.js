const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "test";

const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token || token === "null") {
    res.status(401).json({ message: "로그인 한 유저만 사용 가능한 서비스 입니다." });
    return;
  }
  try {
    req.decoded = jwt.verify(token, secretKey);
    next();
  } catch (err) {
    // 인증 실패
    // accessToken의 유효시간이 초과된 경우
    if (err.name === "TokenExpiredError") {
      res.status(401).json({
        code: 401,
        message: "refreshToken 만료",
      });
    }
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰",
      });
    }
  }
};

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || token === "null") {
    res.status(401).json({ message: "로그인 한 유저만 사용 가능한 서비스 입니다." });
    return;
  }
  try {
    req.decoded = jwt.verify(token, secretKey);
    next();
  } catch (err) {
    // 인증 실패
    // accessToken의 유효시간이 초과된 경우
    if (err.name === "TokenExpiredError") {
      res.status(401).json({
        code: 401,
        message: "accessToken 만료",
      });
    }
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰",
      });
    }
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
