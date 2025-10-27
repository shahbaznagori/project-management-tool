// tasks/dto/filter-task.dto.ts
import { IsEnum,  IsString } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class FilterTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  projectId: string;
}
