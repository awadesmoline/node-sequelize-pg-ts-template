import type { Router } from 'express';
import authController from './authController';
import {
  validateSigninByEmail,
  validateSignupByEmail,
} from './middlewares/validateAuth';

export const authRouter = (router: Router): void => {
  router.post('/auth/signUp', validateSignupByEmail, authController.signUp);
  router.post('/auth/signIn', validateSigninByEmail, authController.signIn);
  router.post('/auth/confirmEmail/:token', authController.confirmEmailAddress);
  router.post(
    '/auth/resendEmailVerification',
    authController.resendEmailVerificationLink,
  );
  router.post('/auth/forgotPassword', authController.sendPasswordResetLink);
  router.put('/auth/resetPassword/:token', authController.resetPassword);
  router.get('/auth/refreshAuthToken', authController.refreshAccessToken);
};
