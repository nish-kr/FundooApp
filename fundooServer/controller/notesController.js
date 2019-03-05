/***********************************************************************************
 *  Purpose: Program file to process the data according to the request & provide it
 *           back to the server side.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

// Importing the server module to use the user services.
const notesService = require('../services/notesService');

// var aws = require('aws-sdk')
// var express = require('express')
// var multer = require('multer')
// var multerS3 = require('multer-s3')

// var s3 = new aws.S3({
//     accessKeyId: process.env.Access_Key_ID,
//     secretAccessKey: process.env.Secret_Access_Key
// })

// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'fundoo-image-upload',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.originalname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })

// module.exports = upload;

exports.addNoteController = (req, res) => {

    notesService.addNoteService(req.body, (err, data) => {

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


exports.getNotesController = (req, res) => {

    notesService.getNotesService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.archiveNoteController = (req, res) => {

    notesService.archiveNoteService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.deleteNoteController = (req, res) => {

    notesService.deleteNoteService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.deleteNoteForeverController = (req, res) => {

    notesService.deleteNoteForeverService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.pinNoteController = (req, res) => {

    notesService.pinNoteService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.changeColorController = (req, res) => {

    notesService.changeColorService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.updateNoteController = (req, res) => {

    notesService.updateNoteService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.updateImageController = (req, res) => {

    notesService.updateImageService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.addLabelController = (req, res) => {

    notesService.addLabelService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.getLabelController = (req, res) => {

    notesService.getLabelService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.getChosenLabelController = (req, res) => {

    notesService.getChosenLabelService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}

exports.deleteLabelController = (req, res) => {

    notesService.deleteLabelService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}


exports.removeLabelFromNoteController = (req, res) => {

    notesService.removeLabelFromNoteService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}


exports.getLabelNotesController = (req, res) => {

    notesService.getLabelNotesService(req.body, (err, data) => {

        // If error is found, send error back in the response.
        if (err) {
            res.status(404).send('Error');
        }

        // Else, send object of the data back in response.
        else {

            // Creating obj object to store just the email of the data.

            // Sending the object back in response.
            res.status(200).send(data);
        }
    })
}