const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  field1: { type: String, required: true },
  field2: { type: String, required: true },
  field3: String,
  dateEx: { type: Date, default: Date.now }
});

const Example = mongoose.model("Example", exampleSchema);

module.exports = Example;
