import { TagDto } from '../dto/tag.dto';
import { Tag } from '../models/tag.entity';

export class TagConverter {

  public static toEntity(dto: TagDto): Tag {
    const tag: Tag = new Tag();
    tag.id = dto.id;
    tag.name = dto.name;
    return tag;
  }

  public static toDto(tag: Tag): TagDto {
    const dto: TagDto = new TagDto();
    dto.name=tag.name;
    dto.id=tag.id;
    return dto;
  }

}
