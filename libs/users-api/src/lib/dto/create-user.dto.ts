import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleDto } from './role.dto';
import { TagDto } from './tag.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsArray()
  roles: Array<RoleDto>;

  tags?: Array<TagDto>;
}


