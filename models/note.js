const mongoose = require("mongoose");

mongoose.set("strict", true);

const url =
  "mongodb+srv://jimmykimunyi:A14CRzegVXZbiMCj@cluster0.eeigmpf.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(console.error(error));
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    require: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Note", noteSchema);
