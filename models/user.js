const mongoose = require("mongoose");
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

//User schema consisting of username, password, and bool data type that determines if the user is a teacher or not
const userSchema = new Schema(
    {
        email: {
            type: String, 
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
          },
          password: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            minlength: [6, 'Minimum password length is 6 characters']
          },
          status: String
    },
{ timestamps: true }
);

// User model; Will look for collection named "User"
const User = mongoose.model('user', userSchema);
module.exports = User;

//Add: necessary encryption to change string password to encoded password with additional "salt" for further encryption