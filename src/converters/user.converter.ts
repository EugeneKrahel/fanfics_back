import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.entity';
import { UserNoPassDto } from '../dto/userNoPass.dto';

export class UserConverter {

  public static toEntity(dto: UserDto): User {
    const user: User = new User();
    user.id = dto.id;
    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user.role = dto.role;
    return user;
  };

  public static toDto(user: User): UserDto {
    const dto: UserDto = new UserDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.password = user.password;
    dto.role = user.role;
    return dto;
  }

  public static toDtoNoPass(user: User): UserNoPassDto {
    const dto: UserNoPassDto = new UserNoPassDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.role = user.role;
    return dto;
  }
}
