/******************************************************************************
 *  Compilation:  node server.js
 *  
 *  Purpose: Program file to get the data from the front-end & process it further.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ******************************************************************************/

/**
 * Required Dependencies.
 */
const express = require('express'); // Importing express module.
const app = express(); // Creating constructor of express module.
const bodyParser = require('body-parser'); // Importing bodyParser module.
const routes = require('./routes/route'); // Importing routes module.
const mongoose = require('mongoose'); // Importing mongoose module to connect to the database.
const url = require('./config/dbconfig'); // Importing dbconfig module to get the url of the database.
const cors = require('cors') // Importing cors module to check the request timed out while reaching the host.
const expressValidator = require('express-validator');
// const cache = require('express-redis-cache')();

require('dotenv').config();
// console.log(process.env.emailId);

// const nodemailer = require('nodemailer');

// Using cors() function
app.use(cors());
try {
    console.log('db url : ', url); // Printing the url just to check.    
} catch (error) {
    console.log(error);
}

/**
 * Function to connect to the database and process the data further.
 * 
 * @param {URL} url  It is the url of the databse.
 */
function mongofunction(url) {

    // Getting connected to the url.
    mongoose.connect(url, { useNewUrlParser: true })

    // Passing error in case connection failed.
    mongoose.connection.on("error", () => {
        console.log("error");
    })

    // Passing connected in case connection is established.
    mongoose.connection.on("open", () => {
        console.log("connected");

    })
}

// cache.on('error', function (error) {
//     throw new Error('Cache error!');
// });

// cache.on('message', function (message) {
//     // ...
// });

// cache.on('connected', function () {
//     // ....
// });

// cache.on('disconnected', function () {
//     // ....
// });


// Using body parser to convert the request data into JSON format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// Checking for any requested data. If any data is passed, control goes to routes.
app.use('/', routes);

// Defining the port of the connection.
var port = 3000;
var host = '0.0.0.0';
// Function to initialize the connection at 'port'
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}!`)

    // And establishing connection with the url.
    mongofunction(url);
})

