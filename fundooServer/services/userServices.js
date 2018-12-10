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
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nish.kr.node@gmail.com',
        pass: 'Nish@123'
    }
})

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

            var mailOptions = {
                from: 'nish.kr.node@gmail.com',
                to: req.email,
                subject: 'Welcome to Fundoo Notes Application',
                text: `Hi ${req.firstName},\n\nThank you for joining our application. We hope you like it.` +
                    `\nFor any further assistance, contact me @ nish.kr.node@gmail.com.` +
                    `\n\nYours Sincerely,\nNishant Kumar\nFundoo App Creator.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('email sent', info.response);
                }
            });

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.forgotPasswordService = (req,callback) =>{
    
}