const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (userEmail) => {
    let payload = {
        email: userEmail
    }

    let secretKey = 'nishant';

    let token = jwt.sign(payload, secretKey);

    return token;
}

const sendEmail = (userDetails) => {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: false,
        auth: {
            // user: process.env.user_id,
            // pass: process.env.password
            user: 'nish.kr.node@gmail.com',
            pass: 'Nish@123'
        }
    });
    console.log('USer details util',userDetails);
    
    var mailOptions = {
        from: 'nish.kr.node@gmail.com',
        // from: process.env.user_id,
        to: userDetails.to,
        subject: userDetails.subject,
        html : userDetails.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('err on mail send ',error);
        } else {
            console.log('email sent successfully ', info.response);
        }
    });
}


module.exports = { generateToken, sendEmail };