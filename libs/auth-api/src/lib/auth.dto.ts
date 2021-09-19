import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
