import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../task-status.enum';

export class PatchTaskDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
