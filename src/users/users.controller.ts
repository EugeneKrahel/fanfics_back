import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserNoPassDto } from '../dto/userNoPass.dto';
import { ChapterDto } from '../dto/chapter.dto';

@Controller('users')
export class UsersController {

  constructor(private service: UsersService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAll(): Promise<UserNoPassDto[]> {
    return await this.service.getAll();
  }

  @Get('search/id')
  public async findByUserId(@Query() params): Promise<UserNoPassDto> {
    return await this.service.findByUserId(params.id);
  }

  @Get('search/email')
  public async findByUserEmail(@Query() params): Promise<UserNoPassDto> {
    return await this.service.findByUserEmail(params.email);
  }

  @Post()
  public async save(@Body() dto: UserDto): Promise<UserDto> {
    console.log(dto);
    return await this.service.save(dto);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() dto: UserNoPassDto) {
    return this.service.update(id, dto);
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.id);
  }
}
