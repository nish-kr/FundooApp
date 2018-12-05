/***********************************************************************************
 *  Purpose: Program file to process the data according to the request & provide it
 *           back to the server side.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

// Importing the server module to use the user services.
const userService = require('../services/userServices');
const app = require('express')();
const { check, validationResult } = require('express-validator/check');

// Defining the loginController to process login requests & exporting it.
exports.loginController = (req, res) => {

    req.checkBody('un', 'Username not valid').isLength({ min: 3 });
    req.checkBody('pass', 'Password not valid').isLength({ min: 6 });

    var errors = req.validationErrors();

    if (errors) {

        console.log(errors);

        return res.status(422).send('Validation error', errors);
    } else {

        // calling userLoginService() to process request data further.
        userService.loginService(req.body, (err, data) => {

            // If error is found, send error back in the response.
            if (err) {
                res.status(500).send('Error');
            } else {

                // If the data fetched has nothing in it, Return Unsuccessful.
                if (data.length == 0) {
                    res.status(404).send('Login UNSUCCESSFUL');
                } else {

                    // Else return Login Successful.
                    res.status(200).send(req.body);
                }
            }
        })
    }
}

// exports.validate = (method) => {
//     switch (method) {
//         case 'createUser':
//             {
//                 return [
//                     body('fn', 'firstName doesn\'t exists').exists().isAlpha(),
//                     body('ln', 'lastName doesn\'t exists').exists().isAlpha(),
//                     body('email').exists().isEmail(),
//                     body('un').exists(),
//                     body('pass').exists().isLength({ min: 6 })
//                 ]
//             }
//     }
// }

// Defining the signupController to process signup requests & exporting it.
exports.signupController = (req, res, next) => {

    req.checkBody('fn', 'First Name not valid').isAlpha();
    req.checkBody('ln', 'Last Name not valid').isAlpha();
    req.checkBody('email', 'Email not valid').isEmail();
    req.checkBody('un', 'Username not valid').isLength({ min: 3 });
    req.checkBody('pass', 'Password not valid').isLength({ min: 6 });

    var errors = req.validationErrors();

    if (errors) {

        console.log(errors);

        return res.status(422).send('Validation error', errors);
    } else {

        userService.signupService(req.body, (err, data) => {


            // If error is found, send error back in the response.
            if (err) {
                res.status(404).send('Error');
            }

            // Else, send object of the data back in response.
            else {

                // Creating obj object to store just the email of the data.
                const obj = {
                    email: data.email
                }

                // Sending the object back in response.
                res.status(200).send(obj);
            }
        })
    }

}

exports.chatController = (req, res, next) => {

    userService.chatService(req.body, (err, data) => {
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.
            const obj = {
                message: data.message
            }

            // Sending the object back in response.
            res.status(200).send(obj);
        }
    })
}