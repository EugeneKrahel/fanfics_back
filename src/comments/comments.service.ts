import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FanficsService } from '../fanfics/fanfics.service';
import { Comment } from '../models/comment.entity';
import { FanficConverter } from '../converters/fanfic.converter';
import { CommentConverter } from '../converters/comment.converter';
import { CommentDto } from '../dto/comment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repo: Repository<Comment>,
              private fanficsService: FanficsService,
              private usersService: UsersService) {
  }

  public async getAll(): Promise<CommentDto[]> {
    return await this.repo.find()
      .then(comments => comments.map(comment => CommentConverter.toDto(comment)));
  }

  public async save(dto: CommentDto, userId: number): Promise<CommentDto> {
    const entity = CommentConverter.toEntity(dto);

    entity.author = await this.usersService.findById(userId);
    entity.fanfic = FanficConverter.toEntity(await this.fanficsService.findById(dto.fanficId));
    entity.date = Date.now();
    console.log(entity);
    return await this.repo.save(entity)
      .then(comment => CommentConverter.toDto(comment));
  }

  public async delete(id: number): Promise<void> {
    const comment = await this.repo.findOne({ id: id });
    await this.repo.remove(comment);
  }

  public async findByFanfic(fanficId: number): Promise<Comment[]> {
    const ids = await this.repo.createQueryBuilder('comment')
      .leftJoin('comment.fanfic', 'fanfic')
      .where('fanfic.id = :id', { id: fanficId })
      .select('comment.id')
      .getMany();
    return await this.repo.findByIds(ids);
  }
}
