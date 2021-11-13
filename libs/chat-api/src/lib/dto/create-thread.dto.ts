import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateThreadDto {
  threadName: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  userIds: string[];

  @IsBoolean()
  isGroup: boolean;
}
