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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MailerModule.forRoot({
      transport: 'smtps://ilearningfanfics@gmail.com:9DUn3HFv6Ajz9WZ@smtp.gmail.com',
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
