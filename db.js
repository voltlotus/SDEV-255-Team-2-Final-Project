// db.js connects to user collection cluster on Mongodb Atlas
const dbURI2 = "";
const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbURI2,
{ useNewUrlParser: true });
module.exports = mongoose;