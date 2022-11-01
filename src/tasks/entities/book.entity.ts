import { v4 } from 'uuid';
import { BigIntType, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Task } from './task.entity';

@Entity()
export class Book {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne()
  task: Task;
}
