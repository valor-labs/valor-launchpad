import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsArray()
  @IsNotEmpty()
  message: any[];

  @IsString()
  @IsNotEmpty()
  socketId: string;
}
