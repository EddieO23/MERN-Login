const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connect_DB = require('./connect_DB/connect_DB.js');

const app = express();

dotenv.config();

console.log('DB_URL from env:', process.env.DB_URL);
console.log('Connect DB module path:', require.resolve('./connect_DB/connect_DB.js'));

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/user', require('./user_routes/UserRoutes'));

app.listen(process.env.PORT, async () => {
  await connect_DB();
  console.log(`Server is up and running at port: ${process.env.PORT}`);
});
