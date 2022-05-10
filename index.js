const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));

app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons'));


const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const siteRouter = require('./routes/siteRoutes');
app.use('/', siteRouter);

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT + ". Ctrl + C to quit")
});