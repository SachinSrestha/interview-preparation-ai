const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

/* authentication routes for user */
app.use("/api/auth", authRouter);

/* interview routes */
app.use("/api/interview", interviewRouter);

module.exports = app