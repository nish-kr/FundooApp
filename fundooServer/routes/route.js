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
const express = require('express'); // Importing express module.
var router = express.Router(); // Creating router using express' router() function.

// Importing the controller module to set the control for each request type.
const userController = require('../controller/userController');
const notesController = require('../controller/notesController');

const notesMiddleware = require('../middleware/notesMiddleware');

// Using router.post() function for '/login' request.
router.post('/login', userController.loginController);

// Using router.post() function for '/signup' request.
router.post('/register', userController.signupController);

// Using router.post() function for '/forgotPassword' request.
router.post('/forgotPassword', userController.forgotPasswordController);

router.post('/addNote', notesMiddleware.addNoteMiddleware, notesController.addNoteController);

router.post('/getNotes', notesMiddleware.addNoteMiddleware, notesController.getNotesController);

router.post('/updateNote', notesMiddleware.updateNoteMiddleware, notesController.updateNoteController);

router.post('/deleteNote', notesMiddleware.deleteNoteMiddleware, notesController.deleteNoteController);

router.post('/archiveNote', notesMiddleware.archiveNoteMiddleware, notesController.archiveNoteController);

router.post('/deleteNoteForever', notesMiddleware.deleteNoteForeverMiddleware,
    notesController.deleteNoteForeverController);

router.post('/pinNote', notesMiddleware.pinNoteMiddleware, notesController.pinNoteController);

router.post('/changeColor', notesMiddleware.changeColorMiddleware, notesController.changeColorController);
// Exporting the router module.
module.exports = router;