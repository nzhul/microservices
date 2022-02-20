import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private _tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this._tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const dbTask = await this._tasksRepository.findOne(id);

    if (!dbTask) {
      throw new NotFoundException(`Task with Id "${id}" not found!`);
    }

    return dbTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this._tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this._tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id "${id}" not found!`);
    }
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const dbTask = await this.getTaskById(id);

    dbTask.status = status;
    this._tasksRepository.save(dbTask);

    return dbTask;
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((t) => t.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (t) => t.title.includes(search) || t.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
}
