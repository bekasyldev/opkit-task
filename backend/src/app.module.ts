import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserService } from './users.service.js';
import { PrismaService } from './prisma.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
