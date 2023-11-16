export const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message || 'Internal Server Error'});
}

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error)
}
