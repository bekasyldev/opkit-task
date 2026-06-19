import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtAuthGuard],
})
export class TaskModule {}
