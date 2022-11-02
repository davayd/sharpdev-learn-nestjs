import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../task-status.enum';
export class GetTasksFilterDto {
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: TaskStatusEnum;

  @IsNotEmpty()
  @IsOptional()
  search?: string;
}
