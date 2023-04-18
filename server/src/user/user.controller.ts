import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return { user };
  }

  @Get('')
  async getUsersBySearch(@Query('search') search: string) {
    const users = await this.userService.findBySearch(search);
    return { users };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    await this.userService.updateUser({ id, ...body });
    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
  }

  @Get(':id/request')
  async getRequest(@Param('id') id: string) {
    const result = await this.userService.getRequests({ id });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/request')
  async setRequest(@Param('id') id: string, @Body() body) {
    const result = await this.userService.setRequest({ id, ...body });
    return result;
  }

  @Get(':id/friend')
  async getFriends(@Param('id') id: string) {
    const result = await this.userService.getFriends({ id });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/friend')
  async setFriend(@Param('id') id: string, @Body() body) {
    const result = await this.userService.setFriend({ id, ...body });
    return result;
  }

  @Get(':id/block')
  async getBlocked(@Param('id') id: string) {
    const result = await this.userService.getBlocked({ id });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/block')
  async setBlocked(@Param('id') id: string, @Body() body) {
    const result = await this.userService.setBlocked({ id, ...body });
    return result;
  }
}
