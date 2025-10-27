import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

@IsEnum(TaskStatus)
@IsOptional()
status?: TaskStatus;


  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
