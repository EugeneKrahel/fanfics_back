import { UserNoPassDto } from './userNoPass.dto';

export class CommentDto {
  id: number;
  author: UserNoPassDto;
  content: string;
  date: Date;
  fanficId: number;
}
