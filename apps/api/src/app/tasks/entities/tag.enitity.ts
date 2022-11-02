import { v4 } from 'uuid';
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Task } from './task.entity';

@Entity()
export class Tag {
  @PrimaryKey()
  id: string = v4();

  @Property()
  name: string;

  @ManyToMany({ entity: () => Task })
  tasks: Collection<Task>;

  constructor(name: string) {
    this.name = name;
  }
}
