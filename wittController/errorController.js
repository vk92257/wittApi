const AppError = require('./../utils/AppError');


const DevErrorHandling = (err,res)=>{
    err.statusCode = err.statusCode||500;
    err.status = err.status||'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack:err.stack,
        error: err
    });
}

const ProErrorHandling =(err,req)=>{
    if(err.isOperational){
     res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else{
        console.log(err);
        res.status(400).json({
            status:'error',
            message:'something went  very wrrong!'
        });
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode||500;
    err.status = err.status||'error';
    if(process.env.MODE_ENV==='development')DevErrorHandling(err,res);
    if(process.env.MODE_ENV==='production') ProErrorHandling(err,res);
    
    
    
  }