import type { User } from '../users';
import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from '../../common/errors';
import config from '../../common/config';
import { FindOptions } from 'sequelize';

export type JWT = {
  userId: number;
};

export type DecodedEmailAccount = {
  userId: number;
  email: string;
}

export type AuthResponseSuccess = {
  user: User;
  token: string;
  isNewUser?: boolean;
};

type AuthResponseError = { error: string };
export type AuthMessageResponse = { message: string };

export type AuthResponse = Response<
  AuthResponseSuccess | AuthResponseError | AuthMessageResponse
  >;

// queries
export const signInUserQuery = (email: string): FindOptions => ({
  where: { email },
});

// helpers

export const decodeAccessToken = (token: string): JWT => {
  try {
    return <JWT>jwt.verify(token, config.jwtSecret);
  } catch (e) {
    throw new UnAuthorizedError('Invalid token');
  }
};

export const generateAccessToken = (
  user: User,
): string => {
  const { id: userId, email } = user;

  return jwt.sign(
    {
      userId,
      email,
    },
    config.jwtSecret,
    { expiresIn: '1d' },
  );
};

export const decodeEmailVerificationToken = (token: string): DecodedEmailAccount => {
  try {
    return <DecodedEmailAccount>jwt.verify(token, config.jwtSecret);
  } catch (e) {
    throw new UnAuthorizedError('Invalid token');
  }
};

export const generateEmailVerificationToken = (userId: number, email: string): string => {
  // TODO: Make the token expire within a day or less.
  return jwt.sign(
    {
      userId,
      email,
    },
    config.jwtSecret,
  );
};

