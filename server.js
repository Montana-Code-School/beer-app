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




//Routes========================================================================


// app.use('/api/users', getUsersRoutes);

require('./config/passport')(passport);

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser());


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./routes/userRoutes.js')(app, passport);
require ('./routes/beerRoutes')(app, passport);
require ('./routes/ratingRoutes')(app, passport);

app.listen(port);
console.log('9090 is the magic port');