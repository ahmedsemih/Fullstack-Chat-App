import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './message.controller';
import { MessageProvider } from './message.provider';
import { MessageService } from './message.service';

@Module({
  imports: [UserModule],
  controllers: [MessageController],
  providers: [MessageService, ...MessageProvider],
  exports: [MessageService]
})
export class MessageModule {}
