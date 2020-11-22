import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from '../services/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, MailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
}
