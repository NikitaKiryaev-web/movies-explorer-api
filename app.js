const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const routes = require('./routes'); // если в папке есть index.js, то он подключится автоматически

dotenv.config();
const { PORT = 3000, NODE_ENV, DB_URL } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
