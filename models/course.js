const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Course schema
const courseSchema = new Schema(
  {
    name: {
      type: Schema.Types.Mixed,
    },
    snippet: {
      type: String,
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
    },
    credits: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Course model; Will look for collection named "Courses"
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
