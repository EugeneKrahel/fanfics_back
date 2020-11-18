import { Genre } from '../models/enums/genre.enum';
import { UserNoPassDto } from './userNoPass.dto';
import { Chapter } from '../models/chapter.entity';

export class FanficDto {
  id: number;
  title: string;
  author: UserNoPassDto;
  genre: Genre;
  chapters: Chapter[];
  tags: string[];
}
