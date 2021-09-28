export const RESET_PASSWORD = 'users.reset.password';
export class ResetPasswordPayload {
  constructor(public email, public password) {}
}
