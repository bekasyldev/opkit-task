import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UserService } from './users.service.js';

import { User as UserModel } from '../generated/prisma/client.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
