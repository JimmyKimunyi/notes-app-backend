require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Note = require("./models/note");
const app = express();

const requestLogger = (req, _res, next) => {
  console.log(" Method :  ", req.method);
  console.log(" Path : ", req.path);
  console.log(" Body : ", req.body);
  console.log(" --- ");
  next();
};

const unknownEndpoint = (_req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);
app.use(cors());

morgan.token("postData", (req) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  return " - ";
});

app.use(morgan(" :method :url :status :response-time ms - :postData"));

app.get("/api/notes", (req, res) => {
  Note.find({}).then((note) => {
    res.json(note);
    console.log("succesfull getAll ");
  });
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
