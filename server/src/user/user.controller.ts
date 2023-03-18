import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param() { id }) {
    const user = await this.userService.findById(id);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param() { id }, @Body() body) {
    await this.userService.updateUser({ id, ...body });
    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/request')
  async setRequest(@Param() { id }, @Body() body) {
    const result = await this.userService.setRequest({ id, ...body });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/friend')
  async setFriend(@Param() { id }, @Body() body) {
    const result = await this.userService.setFriend({ id, ...body });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/block')
  async setBlocked(@Param() { id }, @Body() body) {
    const result = await this.userService.setBlocked({ id, ...body });
    return result;
  }
}
