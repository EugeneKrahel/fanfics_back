import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { UserConverter } from '../converters/user.converter';
import { Repository } from 'typeorm';
import { Role } from '../models/enums/role.enum';
import { UserNoPassDto } from '../dto/userNoPass.dto';
import { FanficDto } from '../dto/fanfic.dto';
import { FanficConverter } from '../converters/fanfic.converter';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
  }

  public async getAll(): Promise<UserNoPassDto[]> {
    return await this.repo.find()
      .then(users => users.map(user => UserConverter.toDtoNoPass(user)));
  }

  public async findOne(email: string): Promise<UserDto | undefined> {
    return await this.repo.findOne({ where: { email } })
      .then(user => UserConverter.toDto(user));
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.repo.findOne({ where: { id } });
  }

  public async findByUserId(id: number): Promise<UserNoPassDto | undefined> {
    return await this.repo.findOne({ where: { id } })
      .then(user => UserConverter.toDtoNoPass(user));
  }

  public async save(dto: UserDto): Promise<UserDto> {
    const user: User = UserConverter.toEntity(dto);
    user.role = Role.USER;
    return await this.repo.save(user)
      .then(user => UserConverter.toDto(user));
  }

  public async delete(name: string): Promise<void> {
    const user = await this.repo.findOne({ username: name });
    await this.repo.remove(user);
  }
}
