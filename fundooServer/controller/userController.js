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
const jwt = require('jsonwebtoken');

// Defining the loginController to process login requests & exporting it.
exports.loginController = (req, res) => {

    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is not valid').isLength({ min: 6 });

    var errors = req.validationErrors();

    if (errors) {

        console.log(errors);

        return res.status(500).send(errors[0].msg);

    } else {

        // calling userLoginService() to process request data further.
        userService.loginService(req.body, (err, data) => {

            // If error is found, send error back in the response.
            if (err) {
                res.status(500).send('Error');
            } else {

                // If the data fetched has  nothing in it, Return Unsuccessful.
                if (data.length == 0) {

                    res.status(404).send({
                        status: false,
                        message: "Login Unsuccessful!"
                    });
                } else {

                    var token = jwt.sign({ id: data[0]._id }, "nish");

                    console.log(token);

                    res.status(200).send({
                        status: true,
                        loginToken: token,
                        message: "Login Successful!"
                    });
                }
            }
        })
    }
}

// Defining the signupController to process signup requests & exporting it.
exports.signupController = (req, res) => {

    req.checkBody('firstName', 'First Name is not valid').isAlpha();
    req.checkBody('lastName', 'Last Name is not valid').isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is not valid').isLength({ min: 6 });

    var errors = req.validationErrors();

    if (errors) {

        console.log("\n", errors, "\n");

        res.status(500).send(errors[0].msg);

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

exports.forgotPasswordController = (req, res) => {

    req.checkBody('email', 'Email is not valid').isEmail();

    var errors = req.validationErrors();

    if (errors) {

        console.log("\n", errors, "\n");

        res.status(500).send(errors[0].msg);

    } else {

        userService.forgotPasswordService(req.body, (err, data) => {

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