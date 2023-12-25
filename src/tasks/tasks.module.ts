import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entity/order.entity';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), LoginModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
