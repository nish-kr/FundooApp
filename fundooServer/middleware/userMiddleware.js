/***********************************************************************************
 *  Purpose: Program file to verify if the data passed is valid or not. If it is
 *           valid, then only the data will be processed further. If not, then the
 *           request will be sent back to the caller.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

// Login middlware to verify the login request.
exports.loginMiddleware = (req, res, next) => {

    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

// Login middlware to verify the signup request.
exports.signupMiddleware = (req, res, next) => {

    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}