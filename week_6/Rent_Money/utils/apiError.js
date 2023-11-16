class APIError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(msg) {
        const message = msg || 'Bad Request';
        return new APIError(400, message);
    }

    static unAuthorized(msg) {
        const message = msg || 'Unauthorized Access';
        return new APIError(401, message);
    }

    static unAuthenticated(msg) {
        const message = msg || 'You need to login first';
        return new APIError(403, message);
    }

    static notFound(msg) {
        const message = msg || 'Resource not Found';
        return new APIError(404, message);
    }

    static customeError(msg) {
        const message = msg || "Server error";
        return new APIError(500, message);
    }
}

export default APIError;