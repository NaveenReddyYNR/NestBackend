import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskEntity } from 'src/entity/order.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const found = await this.tasksService.getTaskById(id);
      return found;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const found = await this.tasksService.deleteTask(id);
      return found;
    } catch (err) {
      throw new ForbiddenException('invalid  id');
    }
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Query('status') status: TaskStatus,
  ): Promise<{ message: string }> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
