var jwt = require('jsonwebtoken');
// var config = require('../config/config.json');
const secret = 'nishant';
// const constantParams = require('../constants/constants');
// const logger = require('../services/logger.services');

var auth = function (req, res, next) {

    var token = req.headers["token"];
    //if(token!=null)
    var response = {
        'message': "Unauthorised Login"
    };

    // console.log("in auth ", secret);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            // console.log(err)
            // logger.error(err);
            return res.status(401).send(response);
        }
        else {
            // console.log(decoded);
            next();
        }
        // console.log(decoded.foo) // bar
    });

}
module.exports = auth;