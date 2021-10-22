import { IsArray, IsNotEmpty } from 'class-validator';
import { TagDto } from './tag.dto';

export class BatchAddTagsDto {
  @IsNotEmpty()
  @IsArray()
  userIds: string[];

  @IsNotEmpty()
  @IsArray()
  tags: TagDto[];
}
