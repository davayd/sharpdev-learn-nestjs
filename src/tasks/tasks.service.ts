import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
// import { Task, TaskStatusEnum } from './task.model';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Task } from 'src/entities/task.entity';
import { EntityRepository } from '@mikro-orm/core';
import { TaskStatusEnum } from './task-status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  createTask({ description, title }: CreateTaskDto): Promise<Task> {
    const newTask: Task = {
      description,
      title,
      id: uuidv4(),
      status: TaskStatusEnum.OPEN,
    };

    this.taskRepository.create(newTask);
    // this.tasks.push(newTask);
    // this.taskRepository.persist(newTask);
    return this.taskRepository.findOne({ id: newTask.id });
    // return this.taskRepository.flush();
  }

  getTaskById(taskId: Task['id']): Task {
    const task = this.tasks.find((i) => i.id === taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  delete(taskId: Task['id']): void {
    const task = this.getTaskById(taskId);
    this.tasks = this.tasks.filter((i) => i.id !== task.id);
  }

  patch(taskId: Task['id'], { status }: PatchTaskDto): Task {
    const task = this.getTaskById(taskId);
    task.status = status;

    return task;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    let tasks = await this.getAllTasks();

    if (status) {
      tasks = tasks.filter((i) => i.status === status);
    }

    if (search) {
      tasks = tasks.filter((i) => {
        if (i.title.includes(search) || i.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }
}
