import { UserNoPassDto } from './userNoPass.dto';

export class CommentDto {
  id: number;
  author: UserNoPassDto;
  content: string;
  date: number;
  fanficId: number;
}
