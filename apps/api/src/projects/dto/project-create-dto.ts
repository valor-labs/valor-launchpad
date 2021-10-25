import { ProjectStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  body: string;

  @IsNotEmpty()
  @IsString()
  progress: string;

  status: ProjectStatus;

  @IsNotEmpty()
  @IsString()
  deletable: string;

  @IsNotEmpty()
  @IsString()
  cloneable: string;

  @IsOptional()
  cloneFrom?: string;
}
