/***********************************************************************************
 *  Purpose: Program file to set the routes for different request based on the url.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

/**
 * Required Dependencies.
 */
// const cache = require('express-redis-cache')();
const express = require('express'); // Importing express module.
var router = express.Router(); // Creating router using express' router() function.




// Importing the controller module to set the control for each request type.
const userController = require('../controller/userController');
const notesController = require('../controller/notesController');

const notesMiddleware = require('../middleware/notesMiddleware');

// AWS S3 Implementaion
const multer = require('multer');
var multerS3 = require('multer-s3');
const auth = require('../middleware/authentication');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.Access_Key_ID,
    secretAccessKey: process.env.Secret_Access_Key
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'fundoo-image-upload',

        metadata: function (req, file, cb) {
            console.log('file in metadata-----', file);
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log('file in key-----', file);
            cb(null, Date.now().toString());
        }
    })
})

router.post('/imageUpload', upload.single(('image'), (err, data) => {
    if (err) {
        console.log('78 err routes file upload', err);
    }
    else {
        console.log('81 data while upload', data);
    }
}), (req, res, next) => {
    console.log('req.file', req.file);
    next();
}, notesController.updateNoteController);


// router.post('/labelAdd', auth, notesController.addLabelController);
router.post('/addLabel', notesController.addLabelController);

router.post('/getLabel', notesController.getLabelController);

router.post('/getChosenLabel', notesController.getChosenLabelController);

router.post('/deleteLabel', notesController.deleteLabelController);

router.post('/removeLabelFromNote', notesController.removeLabelFromNoteController);

router.post('/getLabelNotes', notesController.getLabelNotesController);





//upload.single('image)

// Using router.post() function for '/login' request.
router.post('/login', userController.loginController);

// router.post('/socialLogin', userController.loginController);

// Using router.post() function for '/signup' request.
router.post('/register', userController.signupController);

// Using router.post() function for '/forgotPassword' request.
router.post('/forgotPassword', userController.forgotPasswordController);

router.post('/addNote', notesMiddleware.addNoteMiddleware, notesController.addNoteController);

router.post('/getNotes', notesMiddleware.addNoteMiddleware,
    // cache({
    //     name: 'getNotes',
    //     expire: 60
    // }),
    notesController.getNotesController);

// router.post('/updateNote', notesMiddleware.updateNoteMiddleware, notesController.updateNoteController);

router.post('/updateNote', notesController.updateNoteController);

router.post('/deleteNote', notesController.deleteNoteController);

router.post('/archiveNote', notesController.archiveNoteController);

router.post('/deleteNoteForever', notesController.deleteNoteForeverController);

router.post('/pinNote', notesController.pinNoteController);

router.post('/changeColor', notesController.changeColorController);
// Exporting the router module.
module.exports = router;


