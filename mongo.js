const mongoose = require("mongoose");

const uri =
  "mongodb+srv://jimmiekimunyi:jimmy254@cluster0.eeigmpf.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strict", true);
mongoose.connect(uri);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = Note({
  content: "MongoDB is fun",
  important: true,
});

note.save().then((result) => {
  console.log(" note saved");
  mongoose.connection.close();
});
