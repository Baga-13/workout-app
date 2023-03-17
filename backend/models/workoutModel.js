const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  // first arguement decribes how the object looks
  // we are adding the properties of the schema
  title: {
    type: String,
    required: true,
  },
  // repitition properties
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
});

workoutSchema.set("timestamps", true);

module.exports = mongoose.model("Workout", workoutSchema);
