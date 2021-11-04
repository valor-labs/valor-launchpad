import { IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const strToArr = ({ value }: TransformFnParams) => {
  return value === '' ? undefined : value.split(',');
};

export class QueryProjectListDto {
  @IsOptional()
  sort?: string;

  @IsOptional()
  keyword?: string;

  @IsOptional()
  @Transform(strToArr)
  status?: string[];

  @IsOptional()
  start?: string;

  @IsOptional()
  end?: string;
}
