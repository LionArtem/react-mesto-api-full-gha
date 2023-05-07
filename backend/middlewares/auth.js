require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new AuthorizationError('Необходима авторизация');
    next(err);
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (error) {
    // отправим ошибку, если не получилось
    const err = new AuthorizationError('Необходима авторизация');
    next(err);
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
  // тут будет вся авторизация
};
