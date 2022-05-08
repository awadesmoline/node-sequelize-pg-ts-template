import passwordResetEmailTemplate from './templates/passwordResetTemplate';
import emailConfirmationTemplate from './templates/emailConfirmationTemplate';
import updateEmailTemplate from './templates/updateEmailTemplate';

export const getPasswordResetEmailTemplate = (resetLink: string) => {
  return passwordResetEmailTemplate
    .replace('{{username}}', 'there')
    .replace('{{password_reset_link}}', resetLink);
};

export const getEmailConfirmationTemplate = (
  name: string,
  link: string,
): string => {
  return emailConfirmationTemplate
    .replace('{{verification_link}}', link)
    .replace('{{username}}', name || 'there');
};

export const getUpdateEmailTemplate = (link: string) => {
  return updateEmailTemplate
    .replace('{{username}}', 'there')
    .replace('{{update_email_link}}', link);
};
