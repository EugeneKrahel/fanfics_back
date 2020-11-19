import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ChapterConverter } from '../converters/chapter.converter';
import { ChapterDto } from '../dto/chapter.dto';
import { Chapter } from '../models/chapter.entity';
import { FanficsService } from '../fanfics/fanfics.service';
import { FanficConverter } from '../converters/fanfic.converter';

@Injectable()
export class ChaptersService {
  constructor(@InjectRepository(Chapter) private readonly repo: Repository<Chapter>,
              private fanficsService: FanficsService) {
  }

  public async getAll(): Promise<ChapterDto[]> {
    return await this.repo.find()
      .then(chapters => chapters.map(chapter => ChapterConverter.toDto(chapter)));
  }

  public async save(dto: ChapterDto): Promise<ChapterDto> {
    const entity = ChapterConverter.toEntity(dto);
    entity.fanfic = FanficConverter.toEntity(await this.fanficsService.findById(dto.fanficId));
    console.log(entity);
    return await this.repo.save(entity)
      .then(chapter => ChapterConverter.toDto(chapter));
  }

  public async update(id: number, dto: ChapterDto): Promise<ChapterDto | null> {

    await this.repo.update(id, dto);
    return await this.repo.findOne(id)
      .then(chapter => ChapterConverter.toDto(chapter));
  }

  public async searchByTitle(titlePattern: string): Promise<ChapterDto[]> {
    return await this.repo.find({
      title: Like(`%${titlePattern}%`),
    })
      .then(chapters => chapters.map(chapter => ChapterConverter.toDto(chapter)));
  }

  public async findById(id: number): Promise<ChapterDto | undefined> {
    return await this.repo.findOne({ where: { id } })
      .then(chapter => ChapterConverter.toDto(chapter));
  }

  public async findByFanfic(fanficId: number): Promise<Chapter[]> {
    const ids = await this.repo.createQueryBuilder('chapter')
      .leftJoin('chapter.fanfic', 'fanfic')
      .where('fanfic.id = :id', { id: fanficId })
      .select('chapter.id')
      .getMany();
    return await this.repo.findByIds(ids);
  }

  public async delete(id: number): Promise<void> {
    const chapter = await this.repo.findOne({ id: id });
    await this.repo.remove(chapter);
  }
}
