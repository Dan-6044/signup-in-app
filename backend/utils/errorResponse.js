class ErrorResponse extends Error{

    construct(message, statusCode){
        Super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;