import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class MarkAsReadDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  notificationIds?: number[];
}
