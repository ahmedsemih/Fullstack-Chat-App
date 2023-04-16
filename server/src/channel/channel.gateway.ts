import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from 'src/message/message.service';
import { MessageDto } from './dto/message-dto';

@WebSocketGateway({ cors: true })
export class ChannelGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() message: MessageDto) {
    this.server.emit('chat', message);
    this.messageService.addMessage(message);
  }
}
