const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const {createUser, login} = require('./controllers/users');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {errors} = require('celebrate');
const {validateSignUp, validateSignIn} = require('./middlewares/validation');
const errorsHandler = require('./middlewares/errorsHandler');

dotenv.config();
const {PORT = 3000} = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', movieRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorsHandler);

app.listen(PORT);