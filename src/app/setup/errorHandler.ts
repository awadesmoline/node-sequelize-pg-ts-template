import type {Application, NextFunction, Request, Response} from 'express';
import type { ApplicationError } from '../../common/errors';
import { UserFacingError } from '../../common/errors';

export const errorHandler = (app: Application): void => {
  app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UserFacingError) {
      return req.app.get('env') === 'development'
        ? res.status(err.statusCode).send({ error: err.message, err })
        : res.status(err.statusCode).send({ error: err.message });
    } else {
      return req.app.get('env') === 'development'
        ? res.status(500).send(err)
        : res.status(500).json({ error: 'An error occurred please try again.' });
    }
  });
};
