import { IsArray, IsInt, IsOptional } from 'class-validator';

export class MarkAsReadDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  notificationIds?: number[];
}
