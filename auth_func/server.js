const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const cp = require("cookie-parser");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(cp());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("^^V");
});

app.listen(3000);
