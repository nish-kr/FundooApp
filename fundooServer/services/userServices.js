/***********************************************************************************
 *  Purpose: Program file to process the data according to the request & provide it
 *           back to the server side.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

// Importing usermodel to use the databse properties.
const usermodel = require('../app/model/userModel');

/**
 * @description Creating login service function to fetch the request from the user and pass it to the database.
 */
exports.loginService = (req, callback) => {

    // Calling loginUser() function of usermodel passing the request.
    usermodel.loginUser(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // else callback the data.
            return callback(null, data);
        }
    })
}

/**
 * @description Creating signup service function to fetch the request from the user and pass it to the database.
 * @param {Object} req
 */
exports.signupService = (req, callback) => {

    // Calling signupUser() function of usermodel passing the request.
    usermodel.signupUser(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.chatService = (req, callback) => {

    // Calling signupUser() function of usermodel passing the request.
    usermodel.chatMessage(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // else callback the data.
            return callback(null, data);
        }
    })
}