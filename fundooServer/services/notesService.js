

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

exports.updateImageService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.updateImage(req, (err, data) => {

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

exports.deleteImageService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.deleteImage(req, (err, data) => {

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

exports.addLabelService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.addLabel(req, (err, data) => {

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

exports.getLabelService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.getLabel(req, (err, data) => {

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

exports.getChosenLabelService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.getChosenLabel(req, (err, data) => {

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

exports.deleteLabelService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.deleteLabel(req, (err, data) => {

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


exports.removeLabelFromNoteService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.removeLabelFromNote(req, (err, data) => {

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



exports.getLabelNotesService = (req,callback) => {
    
    // Calling loginUser() function of usermodel passing the request.
    notesmodel.getLabelNotes(req, (err, data) => {

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