import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

@IsEnum(TaskStatus)
status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  projectId: string;


  userId?: string;
}
