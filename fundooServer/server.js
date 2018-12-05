/******************************************************************************
 *  Compilation:  nodemon server.js
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
const controller = require('./controller/userController');
const model = require('./app/model/userModel');
const expressValidator = require('express-validator');

// Using cors() function
app.use(cors());

console.log('db url : ', url); // Printing the url just to check.

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
        console.log(error);
    })

    // Passing connected in case connection is established.
    mongoose.connection.on("open", () => {
        console.log("connected");

    })
}

// Using body parser to convert the request data into JSON format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
// Checking for any requested data. If any data is passed, control goes to routes.
app.use('/', routes);

// Defining the port of the connection.
var port = 3003;
// Function to initialize the connection at 'port'
var server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    // And establishing connection with the url.
    mongofunction(url);
})

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('user connected');

    socket.on('group message', function(msg) {
        var chats = model.chatMessage(msg);
        socket.emit('chat message', chats);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});