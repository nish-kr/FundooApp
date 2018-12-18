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
const bcrypt = require('bcrypt-nodejs'); // Importing bcrypt model to encrypt & decrypt the passwords.

// Defining Mongoose schema for storing user data into the database.
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    token: String
});

// Defining model for mongoose using the userSchema.
var user = mongoose.model('user', userSchema);

/**
 * Creating userDB empty function.
 */
function userDB() { }

// Creating prototype of userDB function loginUser.
userDB.prototype.loginUser = (req, callback) => {

    // Using find function to fetch the data from the database based on the username.
    user.findOne({ email: req.email }, function (err, data) {

        if (err) {
            console.log("Username Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            if (data) {
                console.log(data);
                
                // Cheking if 'res' is true, i.e. passwords are matched.
                if (bcrypt.compareSync(req.password, data.password)) {

                    // Returning the data.
                    return callback(null, data);

                } else {

                    // If not, then return Incorrect password.
                    return callback("Incorrect password");
                }

            } else {

                // If there is no data present, return incorrect username.
                return callback("Invalid email");
            }
        }
    });
}

// Creating prototype of userDB function signupUser.
userDB.prototype.signupUser = (req, callback) => {

    var hash = bcrypt.hashSync(req.password);

    // Creating a new 'user' model & storing user data passed in the model.
    var newData = new user({
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        password: hash,
    });

    // Using model.save function to save the data into the database.
    newData.save(function (error, result) {

        if (error) {

            callback(error);
        } else {

            console.log("Data Updated! \n", newData);
            
            // Returning the result.
            return callback(null, result);
        }
    })
}

userDB.prototype.forgotPassword = (req, callback) => {
    user.findOneAndUpdate( {email:req.email}, {token:req.token}, (err, data) => {
        if (err) {

            return callback(err);
        } else {

            console.log("Data Updated! \n", data);
            
            return callback(null, data);
        }
    })
}

// Exporting a new object of userDB() so that only userDB's methods can be accessed, anything else can't be accessed.
module.exports = new userDB;