import { FanficDto } from '../dto/fanfic.dto';
import { Fanfic } from '../models/fanfic.entity';
import { UserConverter } from './user.converter';

export class FanficConverter {

  public static toEntity(dto: FanficDto): Fanfic {
    const fanfic: Fanfic = new Fanfic();
    fanfic.id = dto.id;
    fanfic.title = dto.title;
    fanfic.genre = dto.genre;
    return fanfic;
  };

  public static toDto(fanfic: Fanfic): FanficDto {
    const dto: FanficDto = new FanficDto();
    dto.id = fanfic.id;
    dto.title = fanfic.title;
    dto.genre = fanfic.genre;
    dto.author = UserConverter.toDtoNoPass(fanfic.author);
    dto.tags = fanfic.tags?.map(tag => tag.name);
    return dto;
  }
}
