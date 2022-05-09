const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User schema consisting of username, password, and bool data type that determines if the user is a teacher or not
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true
          },
          password: {
            type: String,
            required: true
          },
          teacher: {
            type: Boolean,  //Default = false (Not teacher, vice versa when true)
            required: true
          }
    },
{ timestamps: true }
);

// User model; Will look for collection named "Courses"
const User = mongoose.model("User", userSchema);
module.exports = User;

//Add: necessary encryption to change string password to encoded password with additional "salt" for further encryption