const jwt = require("jsonwebtoken");
const secretKey = "test";

// accessToken 생성
const generateAccessToken = (payload) => {
  console.log(payload);

  const token = jwt.sign(payload, secretKey, { algorithm: "HS256", expiresIn: "1m" });

  return token;
};

// refreshToken 생성
const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { algorithm: "HS256", expiresIn: "2m" });

  return token;
};

// refreshToken으로 새로운 accessToken 생성
const recreateAccessToken = (token) => {
  // console.log(token);

  // 여기서 token은 req.cookie에 있는 refreshToken 말하는거임.
  try {
    const refreshDecoded = jwt.verify(token, secretKey);
    print(refreshDecoded);

    const payload = {
      userId: refreshDecoded.userId,
    };

    const newToken = generateAccessToken(payload);
    return newToken;
  } catch (e) {
    console.error("Error refreshing token:", e);
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, recreateAccessToken };
