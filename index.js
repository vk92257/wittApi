const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const wittRouter = require('./router/wittRouters.js');
const app = express();
app.use(express.json());
const DB =
  'mongodb+srv://Vivek:85Z6QoC4X86ecDS6@cluster0.va0v2.mongodb.net/witt?retryWrites=true&w=majority';

mongoose.connect(DB).then((con) => {
  console.log('connection is established');
});

app.use('/api/v1/witt', wittRouter);
app.get('/', (req, res) => {
  res.status(200).send('this witt ');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is connected');
});
