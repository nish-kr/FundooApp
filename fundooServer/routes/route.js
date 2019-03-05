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

// const upload = require('../controller/notesController');

// var redis = require('redis');
// var cache = redis.createClient();

// AWS S3 Implementaion
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({
    accessKeyId: process.env.Access_Key_ID,
    secretAccessKey: process.env.Secret_Access_Key
})

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'fundoo-image-upload',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.originalname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

const singleUpload = upload.single('image');

router.post('/imageUpload', function (req, res) {

    singleUpload(req, res, (err, result) => {
        if (err) {
            console.log("upload error: ", err);
            return res.status(422).send({ errors: err });
        } else {
            console.log('req on upload', req.body);

            // let userData = {
            //     userId: req.body.userId,
            //     _id: req.body.noteId,
            //     image: req.file.location
            // };
            // notesController.updateNoteController(userData, (err, result) => {
            //     if (err)
            //         console.log(err);
            //     if (result)
            //         console.log(result);
            //     return res.status(422).send(result);
            // });
            return res.json({ 'imgUrl': req.file.location });
        }
    });
});


router.post('/updateImage', notesController.updateImageController);

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

router.post('/getNotes', notesMiddleware.addNoteMiddleware, notesController.getNotesController);

// router.post('/updateNote', notesMiddleware.updateNoteMiddleware, notesController.updateNoteController);

router.post('/updateNote', notesController.updateNoteController);

router.post('/deleteNote', notesController.deleteNoteController);

router.post('/archiveNote', notesController.archiveNoteController);

router.post('/deleteNoteForever', notesController.deleteNoteForeverController);

router.post('/pinNote', notesController.pinNoteController);

router.post('/changeColor', notesController.changeColorController);
// Exporting the router module.
module.exports = router;


