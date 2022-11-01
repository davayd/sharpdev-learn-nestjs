import { TaskStatusEnum } from '../task-status.enum';
import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Tag } from './tag.enitity';
import { Book } from './book.entity';

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

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: [Cascade.PERSIST] })
  tags = new Collection<Tag>(this);

  @OneToMany(() => Book, (book) => book.task)
  books = new Collection<Book>(this);
}
