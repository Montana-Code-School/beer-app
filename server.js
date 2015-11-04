var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 9090;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var db = require('./model/db');

var beerModel = require ('./model/beerModel');
var beerRoutes = require ('./routes/beerRoutes');

var ratingModel = require ('./model/ratingModel');
var rateRoutes = require ('./routes/rateRoutes');



//Routes========================================================================


app.use('/api/beer', beerRoutes);
app.use('/api/ratings', rateRoutes);

require('./config/passport')(passport);

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser());


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/test', function(req, res) {
    res.render('pages/test');
});

app.get('/beer_profile', function(req, res) {
    res.render('pages/beer_profile');
});

app.get('/enter_beer', function(req, res) {
    res.render('pages/enter_beer');
});

app.get('/rate', function(req, res) {
    res.render('pages/rate');
});


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./routes/userRoutes.js')(app, passport);

app.listen(port);
console.log('9090 is the magic port');