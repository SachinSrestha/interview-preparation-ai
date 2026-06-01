const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require("./routes/auth.routes")

const app = express();

app.use(express.json())
app.use(cookieParser())

/* authentication routes for user */
app.use("/api/auth", authRouter)

module.exports = app