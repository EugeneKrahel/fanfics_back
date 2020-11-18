import { Tag } from '../models/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { TagConverter } from '../converters/tag.converter';
import { TagDto } from '../dto/tag.dto';

@Injectable()
export class TagsService {

  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {
  }

  public async getAll(): Promise<TagDto[]> {
    return await this.repo.find()
      .then(tags => tags.map(tag => TagConverter.toDto(tag)));
  }

  public async save(dto: TagDto): Promise<TagDto> {
    return await this.repo.save(TagConverter.toEntity(dto))
      .then(tag => TagConverter.toDto(tag));
  }

  public async searchByName(namePattern: string): Promise<TagDto[]> {
    return await this.repo.find({
      name: Like(`%${namePattern}%`)
    })
      .then(tags => tags.map(tag => TagConverter.toDto(tag)));
  }

  public async findByNames(names: string[]): Promise<TagDto[]> {
    return await this.repo.find({
      name: In(names)
    })
      .then(tags => tags.map(tag => TagConverter.toDto(tag)));
  }
}
