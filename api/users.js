// api/users.js; used for checking username and password is correct, encrypts password with secret key and hash function, and give the user a token once their username and password is valid
const jwt = require("jwt-simple");
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// For encoding/decoding JWT
const secret = "supersecret";

// Add a new user to the database
router.post("/user", function(req, res) {

   if (!req.body.username || !req.body.password) {
      res.status(400).json({ error: "Missing username and/or password"});
      return;
   }

   // Create a hash for the submitted password
   const hash = bcrypt.hashSync(req.body.password, 10);

   const newUser = new User({
      username:     req.body.username,
      passwordHash: hash,
      status:       req.body.status
   });

   newUser.save(function(err) {
      if (err) {
         res.status(400).send(err);
      }
      else {
         res.sendStatus(201);  // Created
      }
   });
});

// Sends a token when given valid username/password; path in first parameter of route.post should be relative to the login page
router.post("/auth", function(req, res) {

   if (!req.body.username || !req.body.password) {
      res.status(401).json({ error: "Missing username and/or password"});
      return;
   }

   // Get user from the database
   User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
         res.status(400).send(err);
      }
      else if (!user) {
         // Username not in the database
         res.status(401).json({ error: "Bad username"});
      }
      else {
         // Does given password hash match the database password hash?
         if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
            // Send back a token that contains the user's username
            const token = jwt.encode({ username: user.username }, secret);
            res.json({ token: token });
         }
         else {
            res.status(401).json({ error: "Bad password"});
         }
      }
   });
});

// Gets the status of all users when given a valid token
router.get("/status", function(req, res) {

   // Check if the X-Auth header is set
   if (!req.headers["x-auth"]) {
      return res.status(401).json({error: "Missing X-Auth header"});
   }

   // X-Auth should contain the token 
   const token = req.headers["x-auth"];
   try { 
    const decoded = jwt.decode(token, secret);

    // Send back all username and status fields
    User.find({}, "username status", function(err, users) {
       res.json(users);
    });
 }
 catch (ex) {
    res.status(401).json({ error: "Invalid JWT" });
 }
});

module.exports = router;

