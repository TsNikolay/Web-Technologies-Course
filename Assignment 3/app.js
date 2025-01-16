const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views')); // all our view are within the views folder
app.set('view engine', 'ejs'); // we tell the application that we want to use a view engine called ejs
app.use(express.static('public'));// Server-side code is private; public files are in the public directory
app.use(bodyParser.json()); // To parse incoming JSON requests and make the data accessible in req.body.
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data and make it accessible in req.body.
app.use(cors()); // To enable Cross-Origin Resource Sharing, allowing requests from different origins.
app.use(fileUpload({ createParentPath: true })); // To handle file uploads

app.use('/', indexRouter);
app.use('/users', usersRouter);

// This listens to the console & starts the app.js
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})