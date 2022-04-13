const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/course_list', (req, res) => {
    res.render('course_list', { title: 'Course List' });
});

app.get('/course_single', (req, res) => {
    res.render('course_single', { title: 'Course Single' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Log In' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});