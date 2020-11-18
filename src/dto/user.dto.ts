import { Role } from '../models/enums/role.enum';
import { Fanfic } from '../models/fanfic.entity';

export class UserDto {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  fanfics: Fanfic[];
}
