export const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
}

export const notFound = (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
}