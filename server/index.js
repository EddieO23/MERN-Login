const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connect_DB = require('./connect_DB/connect_DB');

// const path = require('path');
// const connect_DB = require(path.join(__dirname, 'connect_DB', 'connect_DB'));

// // Add extensive logging
// console.log('__dirname:', __dirname);
// console.log('Resolved path:', path.join(__dirname, 'connect_DB', 'connect_DB'));
// console.log('Full directory contents:', require('fs').readdirSync(__dirname));





const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/user', require('./user_routes/UserRoutes'));

app.listen(process.env.PORT, async () => {
  await connect_DB();
  console.log(`Server is up and running at port: ${process.env.PORT}`);
});
