import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fanfic } from '../models/fanfic.entity';
import { FanficDto } from '../dto/fanfic.dto';
import { FanficConverter } from '../converters/fanfic.converter';
import { Tag } from '../models/tag.entity';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FanficsService {
  constructor(@InjectRepository(Fanfic) private readonly repo: Repository<Fanfic>,
              private tagsService: TagsService,
              private usersService: UsersService) {
  }

  public async getAll(): Promise<FanficDto[]> {
    return await this.repo.find()
      .then(fanfics => fanfics.map(fanfic => FanficConverter.toDto(fanfic)));
  }

  public async findOne(title: string): Promise<FanficDto | undefined> {
    return await this.repo.findOne({ where: { title } })
      .then(fanfic => FanficConverter.toDto(fanfic));
  }

  public async findById(id: number): Promise<FanficDto | undefined> {
    return await this.repo.findOne({ where: { id } })
      .then(fanfic => FanficConverter.toDto(fanfic));
  }

  public async findByAuthorID(authorID: number): Promise<Fanfic[]> {
    const ids = await this.repo.createQueryBuilder('fanfic')
      .leftJoin('fanfic.author', 'author')
      .where('author.id = :id', { id: authorID })
      .select('fanfic.id')
      .getMany();
    return await this.repo.findByIds(ids);
  }

  public async save(dto: FanficDto, userId: number): Promise<FanficDto> {
    const entity = FanficConverter.toEntity(dto);
    entity.author = await this.usersService.findById(userId);
    entity.tags = await this.getTags(dto.tags);
    console.log(entity);
    return await this.repo.save(entity)
      .then(fanfic => FanficConverter.toDto(fanfic));
  }

  public async delete(id: number): Promise<void> {
    const fanfic = await this.repo.findOne({ id: id });
    console.log(fanfic);
    await this.repo.remove(fanfic);
  }

  private async getTags(names: string[]) {
    if (!names) {
      return [];
    }
    const dbTags: Tag[] = await this.tagsService.findByNames(names);
    const dbTagsNames = dbTags.map(tag => tag.name);
    const newTags: string[] = names.filter(i => !dbTagsNames.includes(i));
    return dbTags.concat(newTags.map(name => ({ name } as Tag)));
  }
}
