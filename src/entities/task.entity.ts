import { TaskStatusEnum } from '../tasks/task-status.enum';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Task {
  @PrimaryKey()
  id: string;

  @Property()
  description: string;

  @Property()
  title: string;

  @Enum(() => TaskStatusEnum)
  status: TaskStatusEnum;
}
