const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.json());
app.use(cors());

const loginRouter = require("./controllers/login");

// Connect to database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connection to MongoDB:", error.message);
  });

app.use("/api/login", loginRouter);

// Handle errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;