import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fanfic } from '../models/fanfic.entity';
import { FanficsService } from './fanfics.service';
import { FanficsController } from './fanfics.controller';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fanfic]), TagsModule, UsersModule],
  providers: [FanficsService],
  controllers: [FanficsController],
  exports: [FanficsService],
})
export class FanficsModule {
}
