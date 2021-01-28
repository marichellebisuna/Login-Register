const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');
const AuthRoute = require('./Routes/Auth.route');

const { verifyAccessToken } = require('./helpers/jwt_helper');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', verifyAccessToken, async (req, res, next) => {
  console.log(req.headers['authorization']);
  res.send('hello from express.');
});

app.use('/auth', AuthRoute);

//error handler
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Port running on port ${PORT}.`));
