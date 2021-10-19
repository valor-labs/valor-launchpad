import { IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const strToArr = ({ value }: TransformFnParams) => {
  return value === '' ? undefined : value.split(',');
};

export class QueryUserListDto {
  @IsOptional()
  @Transform(strToArr)
  roles?: string[];

  @IsOptional()
  @Transform(strToArr)
  tags?: string[];
}
