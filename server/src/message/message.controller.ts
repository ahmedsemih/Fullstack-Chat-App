import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.getMessage({ id });
    return message;
  }

  @Get('channel/:id')
  async getMessagesByChannel(@Param('id') id: string) {
    const message = await this.messageService.getMessagesByChannel({ id });
    return message;
  }

  @Post('')
  async createMessage(@Body() body) {
    const result = await this.messageService.addMessage(body);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateMessage(@Param('id') id: string, @Body() body) {
    const result = await this.messageService.updateMessage({ id, message:body });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    const result = await this.messageService.deleteMessage({ id });
    return result;
  }
}
