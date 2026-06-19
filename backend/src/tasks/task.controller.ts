import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

type AuthRequest = Request & { user: { id: string; email: string } };

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.taskService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.taskService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.taskService.remove(req.user.id, id);
  }
}
