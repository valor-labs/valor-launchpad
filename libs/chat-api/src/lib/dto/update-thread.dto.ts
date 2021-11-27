import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateThreadDto {
  @IsString()
  @IsOptional()
  threadName?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  userIds?: string[];
}
