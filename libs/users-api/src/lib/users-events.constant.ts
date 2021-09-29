import { UserEntity } from '@prisma/client';

export const RESET_PASSWORD = 'users.reset.password';
export class ResetPasswordPayload {
  constructor(public email, public password) {}
}

export const USER_CREATED_FAT = 'users.created.fat';
export class UserCreatedFatPayload {
  constructor(public user: UserEntity, public shouldSendPassword: boolean, public rawPassword: string) {}
}

export const USER_CREATED_THIN = 'users.created.thin';
export class UserCreatedThinPayload {
  constructor(public userId: string) {}
}
