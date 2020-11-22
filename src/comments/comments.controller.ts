import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from '../dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommentConverter } from '../converters/comment.converter';

@Controller('comments')
export class CommentsController {
  constructor(private service: CommentsService) {
  }

  @Get()
  public async getAll(): Promise<CommentDto[]> {
    return await this.service.getAll();
  }

  @Get('search/fanfic')
  public async findByFanfic(@Query() params): Promise<CommentDto[]> {
    return await this.service.findByFanfic(params.id)
      .then(comments => comments.map(comment => CommentConverter.toDto(comment)));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async save(@Body() dto: CommentDto, @Request() request: any): Promise<CommentDto> {
    return await this.service.save(dto, request.user.id);
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.id);
  }
}
