import type { Request, NextFunction } from 'express';
import { Container } from 'typedi';
import type { AuthResponse } from './authUtils';
import { AuthService } from './authService';

const authController = {
  async signUp(
    req: Request,
    res: AuthResponse,
    next: NextFunction,
  ): Promise<AuthResponse> {
    try {
      const { name, email, password, timezone } = req.body;
      const originUrl = req.get('origin');

      const authService = Container.get(AuthService);
      const { user, token } = await authService.signUp(
        { name, email, password, timezone },
        originUrl,
      );
      return res.status(201).send({ user, token });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  async signIn(
    req: Request,
    res: AuthResponse,
    next: NextFunction,
  ): Promise<AuthResponse> {
    try {
      const { email, password } = req.body;
      const authService = Container.get(AuthService);
      const { user, token, isNewUser } = await authService.signIn(
        email,
        password,
      );
      return res.status(200).send({ user, token, isNewUser });
    } catch (e) {
      next(e);
    }
  },
  resendEmailVerificationLink: () => {},
  confirmEmailAddress: () => {},
  sendPasswordResetLink: () => {},
  resetPassword: () => {},
  refreshAccessToken: () => {},
};

export default authController;
