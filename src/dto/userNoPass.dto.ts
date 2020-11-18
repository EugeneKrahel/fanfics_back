import { Role } from '../models/enums/role.enum';
import { Fanfic } from '../models/fanfic.entity';

export class UserNoPassDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  fanfics: Fanfic[];
}