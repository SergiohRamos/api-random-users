const express = require("express");
const userController = require("./Controller/UserController");
const app = express();

app.get("/", (req, res) => {
  res.send("Olá node com express!");
});

app.post("/load", userController.load);

module.exports = app;