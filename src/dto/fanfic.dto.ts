import { Genre } from '../models/enums/genre.enum';
import { UserNoPassDto } from './userNoPass.dto';
import { Chapter } from '../models/chapter.entity';
import { Comment } from '../models/comment.entity';

export class FanficDto {
  id: number;
  title: string;
  author: UserNoPassDto;
  genre: Genre;
  chapters: Chapter[];
  comments: Comment[];
  tags: string[];
}
