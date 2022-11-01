import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Task } from 'src/tasks/entities/task.entity';
import { Book } from './entities/book.entity';
import { Tag } from './entities/tag.enitity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [MikroOrmModule.forFeature([Task, Tag, Book])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
