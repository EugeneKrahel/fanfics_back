import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './services/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { TagsModule } from './tags/tags.module';
import { FanficsModule } from './fanfics/fanfics.module';
import { ChaptersModule } from './chapters/chapters.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    LoginModule,
    FanficsModule,
    TagsModule,
    ChaptersModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
