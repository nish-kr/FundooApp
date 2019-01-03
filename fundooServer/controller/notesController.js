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