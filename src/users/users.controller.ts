import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserNoPassDto } from '../dto/userNoPass.dto';

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) {
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAll(): Promise<UserNoPassDto[]> {
    return await this.service.getAll();
  }

  @Post()
  public async save(@Body() dto: UserDto): Promise<UserDto> {
    console.log(dto);
    return await this.service.save(dto);
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.id);
  }
}
