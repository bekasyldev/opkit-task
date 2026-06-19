import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserService } from './users.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TaskModule } from './tasks/task.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PrismaModule, TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
