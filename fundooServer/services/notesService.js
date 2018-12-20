

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