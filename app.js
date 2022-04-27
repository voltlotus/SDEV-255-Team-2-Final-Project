const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Course = require("./models/course");
const methodOverride = require("method-override");

// express app
const app = express();

const dbURI =
  "mongodb+srv://sdev255_team2:team2^@cluster0.d0eab.mongodb.net/sdev255_sp22?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  // listen for requests after successful connection to DB
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Log In" });
});

app.get("/course-list", (req, res) => {
  Course.find()
    // -1 means descending order
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("course-list", { title: "All Courses", courses: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/courses/add-course", (req, res) => {
  res.render("add-course", { title: "Add a Course" });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.render("edit", { courses: result, title: "Edit Course" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.render("details", { courses: result, title: "Course Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/courses", (req, res) => {
  const course = new Course(req.body);

  course
    .save()
    .then((result) => {
      res.redirect("/course-list");
    })
    .catch((err) => {
      console.log(err);
    });
});

// route methods ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// edit by id
app.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const options = { new: true };

  await Course.findByIdAndUpdate(id, updatedData, options)
    .then((result) => {
      res.redirect("/course-list");
    })
    .catch((err) => {
      res.status(400).json({ message: error.message });
    });
});

// delete by id
app.delete("/courses/:id", (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/course-list" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
