import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { FanficsService } from './fanfics.service';
import { FanficDto } from '../dto/fanfic.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { FanficConverter } from '../converters/fanfic.converter';

@Controller('fanfics')
export class FanficsController {

  constructor(private service: FanficsService, private usersService: UsersService) {
  }

  @Get()
  public async getAll(): Promise<FanficDto[]> {
    return await this.service.getAll();
  }

  @Get()
  public async findOne(title: string): Promise<FanficDto> {
    return await this.service.findOne(title);
  }

  @Get('search/id')
  public async findById(@Query() params): Promise<FanficDto> {
    return await this.service.findById(params.id);
  }

  @Get('search/author')
  public async findByAuthorID(@Query() params): Promise<FanficDto[]> {
    return await this.service.findByAuthorID(params.id)
      .then(fanfics => fanfics.map(fanfic => FanficConverter.toDto(fanfic)));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async save(@Body() dto: FanficDto, @Request() request: any): Promise<FanficDto> {
    return await this.service.save(dto, request.user.id);
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.id);
  }
}
