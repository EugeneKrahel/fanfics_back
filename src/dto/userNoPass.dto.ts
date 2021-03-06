import { Role } from '../models/enums/role.enum';
import { Fanfic } from '../models/fanfic.entity';
import { Comment } from '../models/comment.entity';

export class UserNoPassDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  key: string;
  unicornDarkTheme: boolean;
  fanfics: Fanfic[];
  comments: Comment[];
}
