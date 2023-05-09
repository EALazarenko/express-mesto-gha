// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import AuthError from '../errors/AuthError';

export default (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Требуется авторизация1!'));
  }

  let payload;

  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Требуется авторизация2!'));
  }

  req.user = payload;
  return next();
};
