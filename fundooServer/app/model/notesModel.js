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
mongoose.set("useFindAndModify", false);
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

notesDB.prototype.getNotes = (req, callback) => {

    notes.find({ userId: req.userId }, function (err, data) {

        if (err) {
            console.log("Username Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

notesDB.prototype.archiveNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { archive: req.archive }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });

    // notes.findOneAndUpdate({ _id: req._id },{archive: req.archive}, function (err, data) {

    //     if (err) {
    //         console.log("Username Request Error");
    //         return callback(err);
    //     } else {

    //         // Checking if there is any data in the database of that username.
    //         console.log(data);

    //         // Returning the data.
    //         return callback(null, data);
    //     }
    // });
}

notesDB.prototype.deleteNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { trash: req.trash }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

notesDB.prototype.deleteNoteForever = (req, callback) => {
    console.log('req on model to delete', req);
    
    notes.deleteOne({ _id: req._id }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

notesDB.prototype.pinNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { pin: req.pin }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

module.exports = new notesDB;
