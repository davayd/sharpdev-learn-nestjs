import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatusEnum } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask({ description, title }: CreateTaskDto): Task {
    const newTask: Task = {
      description,
      title,
      id: uuidv4(),
      status: TaskStatusEnum.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  getTaskById(taskId: Task['id']): Task | undefined {
    return this.tasks.find((i) => i.id === taskId);
  }
}
