import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService]
})
export class UserModule {}
