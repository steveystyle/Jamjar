'use strict'

const express = require('express');

var app = module.exports = express();
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
const cors = require('cors');
const logger = require('morgan');
if (!module.parent) app.use(logger('dev'));

const mustache = require('mustache-express');
const path = require('path');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const PORT = process.env.PORT || 3000;

app.use(cors());


// add cookie control/parser

// add session control

// passport.js for authorisation may solve previous 2 

// add custom message for push response

//create sass (look at what i actually need in classes i.e. bs5 elements/icons/js)

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

// confirm the functionality of this
app.use(sassMiddleware({
    src: path.join(__dirname, 'bs5_files'),
    dest: path.join(__dirname, 'public/css'),
    indentedSyntax: true,
    sourceMap: true
}));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));

require('./loader/bootLoader')(app, { verbose: !module.parent });

app.use(function (err, req, res, next) {
    if (!module.parent) console.error(err.stack);
    res.status(500).render('404');
});

app.use(function (req, res) {
    res.status(404).render('404', { url: req.originalUrl });
});

app.listen(PORT, () => {
    console.log("Server running in %s mode on port %s", process.env.NODE_ENV, PORT)
});