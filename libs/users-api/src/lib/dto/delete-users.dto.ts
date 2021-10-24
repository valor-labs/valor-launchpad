import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteUsersDto {
  @IsNotEmpty()
  @IsArray()
  userIds: string[];
}
