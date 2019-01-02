


exports.addNoteMiddleware = (req, res, next) => {

    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

exports.getNotesMiddleware = (req, res, next) => {
    console.log('getnotes middleware');
    
    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

exports.archiveNoteMiddleware = (req, res, next) => {
    console.log('archiveNote middleware');
    
    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

exports.deleteNoteMiddleware = (req, res, next) => {
    console.log('deleteNote middleware');
    
    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

exports.deleteNoteForeverMiddleware = (req, res, next) => {
    console.log('deleteNote middleware');
    
    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}

exports.pinNoteMiddleware = (req, res, next) => {
    console.log('deleteNote middleware');
    
    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}