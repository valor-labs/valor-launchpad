import { ProjectStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const jsonToArr = ({ value }: TransformFnParams) => {
  return JSON.parse(value);
};

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

  @IsOptional()
  @Transform(jsonToArr)
  assignee?: string[];
}
