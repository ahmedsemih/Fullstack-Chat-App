import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto/create-channel-dto';

@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get(':id')
  async getChannel(@Param('id') id: string) {
    const channel = await this.channelService.getChannel(id);
    return channel;
  }

  @Get('user/:userId')
  async getChannelByUserId(@Param('userId') userId: string) {
    const channels = await this.channelService.getChannelsByUser(userId);
    return channels;
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createChannel(@Body() body: ChannelDto) {
    const result = await this.channelService.createChannel(body);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateChannel(@Param('id') id: string, @Body() body) {
    const result = await this.channelService.updateChannel({ id, channel: body });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteChannel(@Param('id') id: string) {
    const result = await this.channelService.deleteChannel(id);
    return result;
  }
}
