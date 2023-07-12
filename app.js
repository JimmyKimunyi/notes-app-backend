require("dotenv").config();
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strict", true);

// logger.info("connecting to ", config.MONGODB_URI);

mongoose
  .connect(
    "mongodb+srv://jimmykimunyi:A14CRzegVXZbiMCj@cluster0.eeigmpf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    logger.info("successfull request to mongoDB");
  })
  .catch((error) => {
    next(error);
  });
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;
