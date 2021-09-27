import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleDto } from './role.dto';

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
}


