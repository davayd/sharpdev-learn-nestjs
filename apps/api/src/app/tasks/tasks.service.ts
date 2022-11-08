import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { TaskStatusEnum } from './task-status.enum';
import { Tag } from './entities/tag.enitity';
import { Book } from './entities/book.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll({
      populate: ['books', 'tags'],
    });
  }

  async createTask({ description, title, tags }: CreateTaskDto): Promise<Task> {
    const preloadedTags = await Promise.all(
      tags.map((i) => this.preloadTagByName(i)),
    );

    return this.taskRepository.create({
      id: uuidv4(),
      description: description,
      title: title,
      status: TaskStatusEnum.DONE,
      tags: preloadedTags,
      books: new Book(),
    });
  }

  async getTaskById(taskId: Task['id']): Promise<Task> {
    const task = await this.taskRepository.findOne({ id: taskId });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async delete(taskId: Task['id']): Promise<void> {
    const task = await this.getTaskById(taskId);
    return this.taskRepository.removeAndFlush(task);
  }

  async patch(taskId: Task['id'], { status }: PatchTaskDto): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;

    await this.taskRepository.persistAndFlush(task);
    return this.taskRepository.findOne({ id: task.id });
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

    // await this.taskRepository.persistAndFlush(tasks);
    return tasks;
  }

  private async preloadTagByName(name: string) {
    const existingTag = await this.tagRepository.findOne({ name });
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create({ name });
  }
}
