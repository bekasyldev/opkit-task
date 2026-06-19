// tasks/dto/update-task.dto.ts
import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator'
import { Status } from '../../../generated/prisma/enums.js'

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsEnum(Status) 
  status?: Status
}