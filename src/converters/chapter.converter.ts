import { ChapterDto } from '../dto/chapter.dto';
import { Chapter } from '../models/chapter.entity';

export class ChapterConverter {
  public static toEntity(dto: ChapterDto): Chapter {
    const chapter: Chapter = new Chapter();
    chapter.id = dto.id;
    chapter.title = dto.title;
    chapter.content = dto.content;
    return chapter;
  }

  public static toDto(chapter: Chapter): ChapterDto {
    const dto: ChapterDto = new ChapterDto();
    dto.id = chapter.id;
    dto.title = chapter.title;
    dto.content = chapter.content;
    dto.fanficId = chapter.fanfic.id;
    return dto;
  }
}
