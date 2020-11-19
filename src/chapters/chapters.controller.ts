import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChapterDto } from '../dto/chapter.dto';
import { ChapterConverter } from '../converters/chapter.converter';

@Controller('chapters')
export class ChaptersController {

  constructor(private service: ChaptersService) {
  }

  @Get()
  public async getAll(): Promise<ChapterDto[]> {
    return await this.service.getAll();
  }

  @Post()
  public async save(@Body() dto: ChapterDto): Promise<ChapterDto> {
    return await this.service.save(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: ChapterDto) {
    return this.service.update(id, dto);
  }

  @Get('search/id')
  public async findById(@Query() params): Promise<ChapterDto> {
    return await this.service.findById(params.id);
  }

  @Get('search/fanfic')
  public async findByAuthorID(@Query() params): Promise<ChapterDto[]> {
    return await this.service.findByFanfic(params.id)
      .then(chapters => chapters.map(chapter => ChapterConverter.toDto(chapter)));
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.id);
  }
}
