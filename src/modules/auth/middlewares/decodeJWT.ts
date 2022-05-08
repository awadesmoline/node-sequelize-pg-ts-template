import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { JWT } from '../authUtils';
import config from '../../../common/config';

export default (req: Request, res: Response, next: NextFunction): void => {
  const authHeader =
    req.headers.authorization || (req.headers['x-access-token'] as string);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next();
  }
  const token = authHeader.replace(/^Bearer /, '');
  try {
    req.decoded = jwt.verify(token, config.jwtSecret) as JWT;
  } catch (e) {
    req.decoded = null;
  }
  return next();
};
