const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/homeController');
const menu_controller = require('../controllers/menuController');

router.get('/', home_controller.home);

router.get('/menus', menu_controller.main);


//create bespoke 404 html page
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

//create bespoke 500 html page
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});


module.exports = router;
