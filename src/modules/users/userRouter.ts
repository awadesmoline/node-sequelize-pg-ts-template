import type { Router } from 'express';
import userController from './userController';
import { verifyJWT, verifyAdmin } from '../auth/middlewares';

export const userRouter = (router: Router): void => {
  router.put('/users/update_profile', verifyJWT, userController.updateProfile);
  router.put(
    '/users/update_password',
    verifyJWT,
    userController.updatePassword,
  );
  router.delete('/users', verifyJWT, userController.deleteAccount);
  router.get('/users', verifyJWT, verifyAdmin, userController.getUsers);
};
