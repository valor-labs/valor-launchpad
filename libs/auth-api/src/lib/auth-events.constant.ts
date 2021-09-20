export const SEND_SMS = 'auth.send.sms';
export class SendSMSPayload {
  constructor(public phone, public phoneVerifyToken) {}
}
export const SEND_EMAIL = 'auth.send.email';
export class SendEmailPayload {
  constructor(public email, public emailVerifyToken) {}
}
