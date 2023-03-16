import { Controller, Request, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
