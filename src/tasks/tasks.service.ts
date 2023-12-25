import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity, TaskStatus } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRep: Repository<TaskEntity>,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRep.find();
  }

  async getTasksWithFilters(
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<TaskEntity[]> {
    let tasks = await this.getAllTasks();

    const { status, search } = filterDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  async getTaskById(
    id: string,
  ): Promise<{ task: TaskEntity; message: string }> {
    try {
      const task = await this.taskRep.findOne({ where: { id: id } });
      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }
      return { task, message: `Task with ID ${id} has been received` };
    } catch (error) {
      throw new Error('Invalid user ID');
    }
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    try {
      const taskToRemove = await this.taskRep.findOne({ where: { id: id } });
      if (!taskToRemove) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      await this.taskRep.remove(taskToRemove);
      return { message: `Task with ID ${id} has been successfully removed` };
    } catch (error) {
      throw new Error('invalid user Id');
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task: TaskEntity = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    await this.taskRep.save(task);
    return task;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<{ message: string }> {
    const task = await this.getTaskById(id);

    if (task) {
      await this.taskRep.update(id, { status });
      return task;
    } else {
      throw new Error(`Task with ID ${id} not found`);
    }
  }
}
