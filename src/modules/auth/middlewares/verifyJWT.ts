import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../common/config';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const authHeader =
    req.headers.authorization || (req.headers['x-access-token'] as string);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).send({ error: 'Unauthorized Access' });
  }
  const token = authHeader.replace(/^Bearer /, '');
  let decoded = null;

  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return res.status(401).send({ error: 'Invalid token', errorName: e.name });
  }
  req.decoded = decoded;
  return next();
};
