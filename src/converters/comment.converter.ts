import { CommentDto } from '../dto/comment.dto';
import { Comment } from '../models/comment.entity';
import { UserConverter } from './user.converter';

export class CommentConverter {
  public static toEntity(dto: CommentDto): Comment {
    const comment: Comment = new Comment();
    comment.id = dto.id;
    comment.content = dto.content;
    return comment;
  }

  public static toDto(comment: Comment): CommentDto {
    const dto: CommentDto = new CommentDto();
    dto.id = comment.id;
    dto.author = UserConverter.toDtoNoPass(comment.author);
    dto.content = comment.content;
    dto.fanficId = comment.fanfic.id;
    return dto;
  }
}
