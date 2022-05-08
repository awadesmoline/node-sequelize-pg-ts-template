import { Inject, Service } from 'typedi';
import bcrypt from 'bcrypt';
import { UserRepository } from '../users';
import { MailerService } from '../../common/mailer';
import { Repos } from '../../common/interfaces';
import type { AuthResponse } from './authUtils';
import {
  generateAccessToken,
  generateEmailVerificationToken,
} from './authUtils';
import config from '../../common/config';
import { BadRequestError } from '../../common/errors';

export interface SignUpParams {
  name: string;
  email: string;
  password?: string;
  timezone?: string;
}
const clientUrl = config.mailer.clientUrl;

@Service()
class AuthService {
  constructor(
    @Inject(Repos.UserRepository) private userRepository: UserRepository,
    private mailService: MailerService,
  ) {}

  public async signUp(
    userInputData: SignUpParams,
    reqOrigin: string,
  ): Promise<AuthResponse> {
    const hashPassword = bcrypt.hashSync(userInputData.password, 10);

    const user = await this.userRepository.createUserWithUsername({
      ...userInputData,
      password: hashPassword,
    });

    const token = generateAccessToken(user);

    const link = `${
      clientUrl || reqOrigin
    }/confirm_email/${generateEmailVerificationToken(user.id, user.email)}`;

    // TODO: implement pub/sub pattern for this
    try {
      await this.mailService.sendAccountVerificationEmail(user, link);
    } catch (e) {}

    return { user, token };
  }

  public async signIn(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.getByEmail(email);

    // if user exists and has a password, compare them to verify
    if (user.password && bcrypt.compareSync(password, user.password)) {
      const token = generateAccessToken(user);

      return {
        token,
        user,
      };
    } else {
      throw new BadRequestError('Incorrect Email/Password');
    }
  }
}

export { AuthService };
