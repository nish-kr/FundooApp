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

var redisClient = require('redis').createClient;
var redis = redisClient();

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
    },
    image: String
});

var labelSchema = new mongoose.Schema({
    labelName: { type: String },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    noteId: {
        type: schema.Types.ObjectId,
        ref: 'notes'
    }
});

// Defining model for mongoose using the userSchema.
var notes = mongoose.model('notes', noteSchema);

var label = mongoose.model('label', labelSchema);

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

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('added the new note to cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    })
}

notesDB.prototype.getNotes = (req, callback) => {

    redis.get('notes', function (err, reply) {
        if (err) {
            callback(err);
        } else if (reply) {
            console.log('Sent notes from cache only');
            callback(null, JSON.parse(reply));
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated notes the cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.archiveNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { archive: req.archive }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated archive in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.deleteNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { trash: req.trash }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated delete in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
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

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated permanent delete in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.pinNote = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { pin: req.pin }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated pin in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.changeColor = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { color: req.color }, function (err, data) {

        if (err) {
            console.log("Archive Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated color in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.updateNote = (req, callback) => {
    console.log("request on update note", req);

    notes.findByIdAndUpdate(req._id, { ...req }, function (err, data) {

        if (err) {
            console.log("Update Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated the note in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.updateImage = (req, callback) => {
    console.log("request on update image", req);

    notes.findByIdAndUpdate(req._id, { ...req }, function (err, data) {

        if (err) {
            console.log("Update Request Error");
            return callback(err);
        } else {

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated the note in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.deleteImage = (req, callback) => {

    notes.findByIdAndUpdate(req._id, { image: null }, { new: true }, function (err, data) {

        if (err) {
            console.log("Update Request Error");
            return callback(err);
        } else {/*  */
            // console.log(data);

            notes.find({ userId: req.userId }, function (err, data) {

                if (err) {
                    console.log("Username Request Error");
                    return callback(err);
                } else {
                    console.log('updated the note in cache and then sent');
                    // Checking if there is any data in the database of that username.
                    redis.set('notes', JSON.stringify(data), function () {

                        return callback(null, data);
                    });

                    // Returning the data.

                }
            });
        }
    });
}

notesDB.prototype.addLabel = (req, callback) => {
    // console.log("request on add label", req);
    var newLabel = new label({
        labelName: req.labelName,
        userId: req.userId,
        noteId: null
    });

    if (req.noteId) {
        newLabel.noteId = req.noteId
    }

    // var newLabel = new label({
    //     labelName: req.labelName,
    //     userId: req.userId,
    //     noteId: req.noteId
    // });

    newLabel.save(function (err, data) {

        if (err) {
            console.log("Add Label Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            console.log("update notes", data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

notesDB.prototype.getLabel = (req, callback) => {
    // console.log("request on add label", req);
    label.find({ userId: req.userId }, function (err, data) {

        if (err) {
            console.log("LAbel Request Error");
            return callback(err);
        } else {

            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            return callback(null, data);
        }
    });
}

notesDB.prototype.getChosenLabel = (req, callback) => {
    // console.log("request on add label", req);
    label.find({ userId: req.userId }, function (err, data) {

        if (err) {
            console.log("LAbel Request Error");
            return callback(err);
        } else {

            label.find({ noteId: req.noteId }, function (err, data) {

                if (err) {
                    console.log("LAbel Request Error");
                    return callback(err);
                } else {

                    // Checking if there is any data in the database of that username.
                    // console.log(data);

                    // Returning the data.
                    return callback(null, data);
                }
            });
            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            // return callback(null, data);
        }
    });
}

notesDB.prototype.deleteLabel = (req, callback) => {
    console.log("request on delete label", req);
    // label.find({ labelName: req.labelName }, function (err, data) {

    //     if (err) {
    //         console.log("Label Request Error");
    //         return callback(err);
    //     } else {
    const count = 1;
    // while (count != 0) {

    try {
        label.bulkWrite(
            [
                {
                    deleteMany: { "filter": { "labelName": req.labelName } }
                }
            ]
        )
        return callback(null, true);
    } catch (e) {
        console.log(e);
    }
    // finally {
    //     return callback(null, true);
    // }
}

notesDB.prototype.removeLabelFromNote = (req, callback) => {
    // console.log("request on add label", req);
    label.findOneAndUpdate({ labelName: req.labelName, noteId: req.noteId, userId: req.userId }, { noteId: null }, function (err, data) {
        if (err) {
            console.log("userId wrong");
            return callback(err);
        } else {
            // console.log('req coming',req);

            // label.find({ userId: req.userId }, function (err, data) {
            //     if (err) {
            //         console.log("Note ID not found");
            //         return callback(err);
            //     } else {
            //         label.findOneAndUpdate({ noteId: req.noteId }, { noteId: null }, function (err, data) {
            //             if (err) {
            //                 console.log("labelName not found");
            //                 return callback(err);
            //             } else {
            console.log('returning data after deletion', data);

            return callback(null, data);
            //             }
            //         });
            //     }
            // });
            // Checking if there is any data in the database of that username.
            // console.log(data);

            // Returning the data.
            // return callback(null, data);
        }
    });
}

notesDB.prototype.getLabelNotes = (req, callback) => {
    console.log("request on add label", req);
    label.find({ userId: req.userId, labelName: req.labelName }, function (err, data) {

        if (err) {
            console.log("LAbel Request Error");
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
