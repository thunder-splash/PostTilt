class ApiError extends Error {
    constructor(status, message, details = null) {
        super();
        this.status = status;
        this.message = message;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, details = null) {
        return new ApiError(400, message, details);
    }

    static unauthorized(message, details = null) {
        return new ApiError(401, message, details);
    }

    static forbidden(message, details = null) {
        return new ApiError(403, message, details);
    }

    static notFound(message, details = null) {
        return new ApiError(404, message, details);
    }

    static internal(message, details = null) {
        return new ApiError(500, message, details);
    }
}

module.exports = ApiError;