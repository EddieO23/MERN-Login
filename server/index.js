const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connect_DB = require('./connect_DB/connect_DB');

const path = require('path');

// Debug logging
console.log('Current directory:', __dirname);
console.log('Resolved connect_DB path:', path.resolve('./connect_DB/connect_DB'));
console.log('Directory contents:', require('fs').readdirSync('./'));




const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/user', require('./user_routes/UserRoutes'));

app.listen(process.env.PORT, async () => {
  await connect_DB();
  console.log(`Server is up and running at port: ${process.env.PORT}`);
});
