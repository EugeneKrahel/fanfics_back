import { Role } from '../models/enums/role.enum';
import { Fanfic } from '../models/fanfic.entity';
import { Comment } from '../models/comment.entity';

export class UserDto {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  fanfics: Fanfic[];
  comments: Comment[];
}
