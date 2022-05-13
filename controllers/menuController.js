'use strict'

exports.name = 'menus';
exports.suffix = ':type?';

exports.menus = function (req, res) {
    res.redirect('/menus/lunch')
};

exports.lunch = function (req, res) {
    res.render('menus', {
        "title": "Lunch"
    })
}

exports.dinner = function (req, res) {
    res.render('menus', {
        "title": "Dinner"
    })
}