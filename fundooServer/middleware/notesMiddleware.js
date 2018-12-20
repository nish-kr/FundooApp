


exports.addNoteMiddleware = (req, res, next) => {

    // If the body of the request is not null, then only next() will be called.
    if (req.body != null) {
        next();
    }
}