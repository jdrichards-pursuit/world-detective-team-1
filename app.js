// DEPENDENCIES
const cors = require("cors");
const express = require("express");

const authController = require("./controllers/authController");
const countriesController = require("./controllers/countriesController");
const youngerQuestionsController = require("./controllers/youngerQuestionsController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());

app.use((req, _res, next) => {
  console.log("Origin Requested:", req.headers.origin);
  next();
});

app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/countries", countriesController);
app.use("/api/younger_questions", youngerQuestionsController);

// ROUTES
app.get("/", (_req, res) => {
  res.send("Welcome to Global Agent Backend Server");
});

// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
