import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectCommentDto {
  @IsOptional()
  commentId?: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
