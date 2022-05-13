'use strict'

const mapboxgl = require('mapbox-gl');




exports.home = function (req, res) {
    const data = {
        "title": "Home",
    };
    res.render('home', data);
};



