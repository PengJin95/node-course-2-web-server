const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(function(req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use(function(req, res, next) {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', function(req, res) {
    res.send({
        errorMessage: 'bad request'
    });
});

app.get('/projects', function(req, res) {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    })
})


app.listen(3000, function() {
    console.log('loading');
});