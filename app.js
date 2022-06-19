require("dotenv").config();

const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const server = http.createServer(app);
const port = 8080;
const api_key = require("./config/config");

const users = require("./models/userSchema");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(api_key.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    server.listen(process.env.PORT || 8080);
    console.log("Server Started!");
  })
  .catch((err) => {
    console.log(err);
  });
