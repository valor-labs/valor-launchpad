import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTermsOfUseDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
