import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
        let task = createTaskDto;
         task.dueDate= new Date();
      const newTask = await this.taskModel.create(task);
      return { success: true, status: 201, data: newTask };
    } catch (error) {
      this.logger.error('Error creating task', error.stack);
      return { success: false, status: 500, message: 'Failed to create task' };
    }
  }

  async   findAll(projectId: string) {
    try {
      const tasks = await this.taskModel.find({projectId})
      return { success: true, status: 200, data: tasks};
    } catch (error) {
      this.logger.error('Error fetching tasks', error.stack);
      return { success: false, status: 500, message: 'Failed to fetch tasks' };
    }
  }

  async findById(id: string) {
    try {
      const task = await this.taskModel.findOne({ _id:id }).populate('projectId');
      if (!task) return { success: false, status: 404, message: 'Task not found' };
      return { success: true, status: 200, data: task };
    } catch (error) {
      this.logger.error('Error fetching task', error.stack);
      return { success: false, status: 500, message: 'Failed to fetch task' };
    }
  }

  async update(id: string, dto: UpdateTaskDto) {
    try {
      const updated = await this.taskModel.findOneAndUpdate(
        { _id: id},
        dto,
        { new: true },
      );
      if (!updated) return { success: false, status: 404, message: 'Task not found' };
      return { success: true, status: 200, data: updated };
    } catch (error) {
      this.logger.error('Error updating task', error.stack);
      return { success: false, status: 500, message: 'Failed to update task' };
    }
  }

  async delete(id: string, userId: string) {
    try {
        console.log(id , userId)
      const deleted = await this.taskModel.findOneAndDelete({ _id: id });
      if (!deleted) return { success: false, status: 404, message: 'Task not found' };
      return { success: true, status: 200, data: deleted };
    } catch (error) {
      this.logger.error('Error deleting task', error.stack);
      return { success: false, status: 500, message: 'Failed to delete task' };
    }
  }

  async filterByStatus(status: string, projectId: string) {
    try {
      const tasks = await this.taskModel.find({ projectId: projectId , status: status})
      return { success: true, status: 200, data: tasks };
    } catch (error) {
      this.logger.error('Error filtering tasks by status', error.stack);
      return { success: false, status: 500, message: 'Failed to filter tasks' };
    }
  }
}
