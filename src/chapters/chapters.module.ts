import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '../models/chapter.entity';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { FanficsModule } from '../fanfics/fanfics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter]), FanficsModule],
  providers: [ChaptersService],
  controllers: [ChaptersController],
  exports: [ChaptersService],
})
export class ChaptersModule {
}
