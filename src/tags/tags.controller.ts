import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from '../dto/tag.dto';

@Controller('tags')
export class TagsController {

  constructor(private service: TagsService) {
  }

  @Get()
  public async getAll(): Promise<TagDto[]> {
    return await this.service.getAll();
  }

  @Post()
  public async save(@Body() dto: TagDto): Promise<TagDto> {
    return await this.service.save(dto);
  }

  @Get('search')
  public async searchByName(@Query() params): Promise<TagDto[]> {
    return await this.service.searchByName(params.name);
  }
}
