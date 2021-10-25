import { IsNotEmpty, IsString } from 'class-validator';

export class updatePublicInfoProfileDto {
  @IsNotEmpty()
  @IsString()
  profileId: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  alt: string;

  @IsNotEmpty()
  @IsString()
  bio: string;
}
