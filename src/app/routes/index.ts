import type { Application } from 'express';
import { userRouter } from '../../modules/users/userRouter';
import { authRouter } from '../../modules/auth/authRouter';

const routes = (app: Application): void => {
  userRouter(app);
  authRouter(app);
};

export default routes;
