require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const wittRouter = require('./router/wittRouters.js');
const globalErrorHandler = require('./wittController/errorController');
const AppError = require('./utils/AppError');
const app = express();
app.use(express.json());
const DB =
  'mongodb+srv://Vivek:85Z6QoC4X86ecDS6@cluster0.va0v2.mongodb.net/witt?retryWrites=true&w=majority';

mongoose.connect(DB).then((con) => {
  console.log('connection is established');
});

app.use('/api/v1/witt', wittRouter);
app.get('/', function (req, res) {
  res.status(200).send('this witt ');
});

app.all('*',(req,res,next)=>{
  // res.status(404).json({
  //   status:"fail",
  //   message:`you can't acces ${req.originalUrl}.`
  // });
//  let err = new Error(`you can't acces ${req.originalUrl}.`);
//     err.stack = "fail";
//     err.statusCode = 404;
    next(new AppError(`you can't acces ${req.originalUrl}.`,500));
})

app.use(globalErrorHandler);

// console.log(process.env);
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is connected');
});
