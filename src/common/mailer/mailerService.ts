import type mail from '@sendgrid/mail';
import { Inject, Service } from 'typedi';
import {
  getEmailConfirmationTemplate,
  getPasswordResetEmailTemplate,
  getUpdateEmailTemplate,
} from './mailerUtils';
import type { User } from '../../modules/users';
import { Injected } from '../../app/setup/dependencyInjector';

@Service()
export class MailerService {
  constructor(@Inject(Injected.mailer) private mailer: typeof mail) {}

  public async sendAccountVerificationEmail(
    user: User,
    verificationLink: string,
  ): Promise<void> {
    const { email, name } = user;
    const data = {
      to: email,
      from: { name: 'Stoic Bible', email: 'noreply@stoicbible.com' },
      subject: 'Verify your Email address for Stoic Bible',
      html: getEmailConfirmationTemplate(name, verificationLink),
    };
    await this.mailer.send(data);
  }

  public async sendPasswordResetLink(
    email: string,
    resetLink: string,
  ): Promise<void> {
    const data = {
      to: email,
      from: { name: 'Stoic Bible', email: 'noreply@stoicbible.com' },
      subject: 'Reset your password',
      html: getPasswordResetEmailTemplate(resetLink),
    };
    await this.mailer.send(data);
  }

  public async forwardFeedback(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.mailer.send({
      to: 'support@stoicbible.com',
      from: email,
      subject,
      content: message as never,
    });
  }

  public async sendEmailChangeConfirmation(
    email: string,
    link: string,
  ): Promise<void> {
    await this.mailer.send({
      to: email,
      from: { name: 'Stoic Bible', email: 'noreply@stoicbible.com' },
      subject: 'Confirm Email Change',
      html: getUpdateEmailTemplate(link),
    });
  }

}
