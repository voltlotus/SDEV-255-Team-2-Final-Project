const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User schema consisting of username, password, and bool data type that determines if the user is a teacher or not
const userSchema = new Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true
          },
          password: {
            type: String,
            required: true,
            unique: true,
            minlength: 6
          },
          teacher: {
            type: Boolean,  //Default = false (Not teacher, vice versa when true)
            required: true
          },
          status: String
    },
{ timestamps: true }
);

// User model; Will look for collection named "User"
const User = mongoose.model('user', userSchema);
module.exports = User;

//Add: necessary encryption to change string password to encoded password with additional "salt" for further encryption