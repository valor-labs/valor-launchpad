import { IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const strToInt =
  (defaultVal: number) =>
  ({ value }: TransformFnParams) =>
    value === '' ? defaultVal : +value;
const strToBool = ({ value }: TransformFnParams) => value === 'true';

export class QueryNotificationListDto {
  @IsOptional()
  @Transform(strToBool)
  read?: boolean;

  @IsOptional()
  type?: string;

  @IsOptional()
  @Transform(strToInt(1))
  pageIndex?: number;

  @IsOptional()
  @Transform(strToInt(10))
  pageSize?: number;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortDir?: 'asc' | 'desc';
}
