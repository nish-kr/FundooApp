/***********************************************************************************
 *  Purpose: Program file to access the databse & store/validate data according to
 *           the user request.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

/**
 * Dependencies required.
 */
const mongoose = require('mongoose'); // Importing mongoose model to use the Mongo database.
const bcrypt = require('bcrypt'); // Importing bcrypt model to encrypt & decrypt the passwords.
const io = require('socket.io')();

const saltRounds = 10;

// Defining Mongoose schema for storing user data into the database.
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String
})

var chatSchema = new mongoose.Schema({
    id: String,
    message: String,
    sender: String,
    time: Date
})

// Defining model for mongoose using the userSchema.
var user = mongoose.model('user', userSchema);

// Defining model for mongoose using the userSchema.
var chat = mongoose.model('chat', chatSchema);

/**
 * Creating userDB empty function.
 */
function userDB() {}

// Creating prototype of userDB function loginUser.
userDB.prototype.loginUser = (req, callback) => {

    // Using find function to fetch the data from the database based on the username.
    user.find({ userName: req.un }, function(err, data) {

        if (err) {
            console.log("Username Request Error");
            return callback(err);
        } else {

            // Using bcrypt.compare method to compare the password of user with the database.            
            bcrypt.compare(req.pass, data[0].password, function(err, res) {

                if (err) {
                    return callback("Decryption Error!");
                } else {

                    // Checking if there is any data in the database of that username.
                    if (data.length > 0) {

                        // Cheking if 'res' is true, i.e. passwords are matched.
                        if (res) {

                            // Returning the data.
                            return callback(null, data);

                        } else {

                            // If not, then return Incorrect password.
                            return callback("Incorrect password");
                        }

                    } else {

                        // If there is no data present, return incorrect username.
                        return callback("Invalid username");
                    }
                }
            });
        }
    });
}

// Creating prototype of userDB function signupUser.
userDB.prototype.signupUser = (req, callback) => {

    // Encrypting the password using bcrypt.hash().
    bcrypt.hash(req.pass, saltRounds, function(err, hash) {

        if (err) {
            return callback("Encryption Error!")
        } else {

            // Creating a new 'user' model & storing user data passed in the model.
            var newData = new user({
                firstName: req.fn,
                lastName: req.ln,
                email: req.email,
                userName: req.un,
                password: hash,
            });

            // Using model.save function to save the data into the database.
            newData.save(function(error, result) {

                if (error) {
                    callback(error);
                } else {
                    console.log("Data Updated!");

                    // Returning the result.
                    return callback(null, result);
                }
            })
        }
    });
}


userDB.prototype.chatMessage = (req, callback) => {

    // Using find function to fetch the data from the database based on the username.
    user.find({ userName: req.un }, function(err, data) {

        if (err) {
            console.log("Username Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            if (data.length > 0) {

                var newMessage = new chat({
                    id: data[0]._id,
                    message: req.message,
                    sender: data[0].userName
                });

                // Using model.save function to save the data into the database.
                newMessage.save(function(error, result) {

                    if (error) {
                        callback(error);
                    } else {
                        console.log("Data Updated!");

                        // Returning the result.
                        return callback(null, result);
                    }
                })

            } else {

                // If there is no data present, return incorrect username.
                return callback("Invalid username");
            }
        }
    });
}

// Exporting a new object of userDB() so that only userDB's methods can be accessed, anything else can't be accessed.
module.exports = new userDB;