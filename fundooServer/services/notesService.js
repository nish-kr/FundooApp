

const notesmodel= require('../app/model/notesModel');

exports.addNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.addNote(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}




exports.getNotesService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.getNotes(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.deleteNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.deleteNote(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.archiveNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.archiveNote(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.deleteNoteForeverService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.deleteNoteForever(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.pinNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.pinNote(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.changeColorService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.changeColor(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}

exports.updateNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.updateNote(req, (err, data) => {

        // If any error occurs, callback the error
        if (err) {
            return callback(err);
        } else {

            // console.log("data in service callbnack", data);

            // else callback the data.
            return callback(null, data);
        }
    })
}