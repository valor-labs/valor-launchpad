import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Element } from 'slate';

export class CreateMessageDto {
  @IsArray()
  @IsNotEmpty()
  message: Element[];

  @IsString()
  @IsNotEmpty()
  socketId: string;
}
