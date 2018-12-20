/***********************************************************************************
 *  Purpose: Program file to access the databse & store/validate data according to
 *           the user request.
 *
 *  @author  Nishant Kumar
 *  @version 1.0
 *  @since   20-11-2018
 ***********************************************************************************/

/**
 * Dependencies required.
 */
const mongoose = require('mongoose'); // Importing mongoose model to use the Mongo database.
const schema = mongoose.Schema;

// Defining Mongoose schema for storing user data into the database.
var noteSchema = new mongoose.Schema({
    title: { type: String },
    note: { type: String },
    reminder: { type: String },
    pin: { type: Boolean },
    trash: { type: Boolean },
    archive: { type: Boolean },
    color: { type: String },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
});

// Defining model for mongoose using the userSchema.
var notes = mongoose.model('notes', noteSchema);

/**
 * Creating userDB empty function.
 */
function notesDB() { }

notesDB.prototype.addNote = (req, callback) => {

    var newNote = new notes({
        title: req.title,
        note: req.note,
        reminder: req.reminder,
        pin: req.pin,
        trash: req.trash,
        archive: req.archive,
        color: req.color,
        userId: req.userId,
    });

    // Using model.save function to save the data into the database.
    newNote.save(function (error, result) {

        if (error) {

            callback(error);
        } else {

            console.log("Data Updated! \n", newNote);

            // Returning the result.
            return callback(null, result);
        }
    })
}

module.exports = new notesDB;
