import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema , Task } from './task.schema';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';

@Module({

      imports: [
          MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        ],
         controllers: [TasksController],
          providers: [TasksService]
})
export class TaskModule {}
