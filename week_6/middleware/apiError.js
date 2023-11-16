class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static badRequest(message) {
    return new APIError(message || "Invalid request", 400);
  }

  static notFound(message) {
    return new APIError(message || "resourse not found", 404);
  }

  static unAuthorized(message) {
    return new APIError(message || "You are authorized to access this route", 401);
  }

  static unAuthenticated(message) {
    return new APIError(message || "You are not authenticated", 403);
  }

  static customError(message) {
    return new APIError(message  || "Unknown error occured", 500);
  }
}

export { APIError };