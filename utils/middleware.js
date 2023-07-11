const logger = require("./logger");
const requestLogger = (req, res, next) => {
  logger.info(" Method : ", req.method);
  logger.info(" Path :", req.path);
  logger.info(" Body : ", req.body);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, res, req, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send(error.name);
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
