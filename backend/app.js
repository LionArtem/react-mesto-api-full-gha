const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const sigRouter = require('./routes/sig');
const NotFoundError = require('./errors/not-found-err');
const centralErrorHandling = require('./middlewares/centralErrorHandling');
const { listDomen } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (listDomen.includes(origin)) {
  // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use('/', sigRouter);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use((req, res, next) => {
  const err = new NotFoundError('адресс не существует');
  next(err);
});

app.use(errors()); // обработчик ошибок celebrate

app.use(centralErrorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
