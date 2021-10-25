import { IsArray, IsNotEmpty } from 'class-validator';

export class RestoreUsersDto {
  @IsNotEmpty()
  @IsArray()
  userIds: string[];
}
