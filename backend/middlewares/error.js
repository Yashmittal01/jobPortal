class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req,res, next)=>{
    err.message = err.message || "INTERNAL SERVER ERROR";
    err.statusCode = err.statusCode || 500;
 
    if(err.name === "CastError"){
        const message =   `Resource not found. Invalid ${err.path}`;
        err= new ErrorHandler(message, 400);
    }
    if(err.name === 11000){
     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err= new ErrorHandler(message, 400);
    }

    if(err.name === "JsonWebTokenError"){
        const message =`Json Web token is Invalid, Try Again`;
        err= new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError"){
        const message =   `Json web Token is expired. Try Again`;
        err= new ErrorHandler(message, 400);
    }
return res.status(err.statusCode).json({
    success: false,
    message: err.message,
});
};

export default ErrorHandler;