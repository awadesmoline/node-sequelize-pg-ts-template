import { Container } from 'typedi';
import type { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { UserRepository } from '../../users';
import { BadRequestError, NotFoundError } from '../../../common/errors';
import { Repos } from '../../../common/interfaces';

const ValidateAuth = {
  validateSignupByEmail: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new BadRequestError('Email and password are required'));
    }
    if (!validator.isEmail(email)) {
      return next(new BadRequestError('Invalid Email'));
    }
    if (!validator.isAlphanumeric(password)) {
      return next(
        new BadRequestError('Password must contain only letters and numbers'),
      );
    }

    if (password.length < 8) {
      return next(new BadRequestError('Password length must be at least 8'));
    }

    try {
      const userRepository = Container.get<UserRepository>(
        Repos.UserRepository,
      );
      const user = await userRepository.getByEmail(email);
      console.log('user', user);

      if (user) {
        return next(
          new BadRequestError('User already exists. Please sign in.'),
        );
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        // proceed to sign them up.
        return next();
      } else {
        return next(e);
      }
    }
  },

  validateSigninByEmail: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { email, password } = req.body;
    if (!validator.isEmail(email) || !validator.isAlphanumeric(password)) {
      return next(new BadRequestError('Incorrect Email/Password'));
    }

    const userRepository = Container.get<UserRepository>(Repos.UserRepository);
    const isEmailRegistered = await userRepository.checkEmailExists(email);

    if (isEmailRegistered) {
      return next();
    } else {
      return next(
        new NotFoundError(
          'User does not exist. Please Sign up to get started.',
        ),
      );
    }
  },

  validatePasswordReset: (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    const { password } = req.body;
    if (!validator.isAlphanumeric(password)) {
      return next(
        new BadRequestError('Password must contain only letters and numbers'),
      );
    } else if (password.length < 8) {
      return next(new BadRequestError('Password length must be at least 8'));
    } else {
      return next();
    }
  },
};

export const {
  validateSigninByEmail,
  validateSignupByEmail,
  validatePasswordReset,
} = ValidateAuth;
