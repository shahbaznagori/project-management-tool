import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("create")
  async create(@Body() dto: CreateTaskDto) {
    try {
      return await this.tasksService.create(dto);
    } catch (err) {
      console.log('Error in create task controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }

  @Get('getAll/:projectId')
  async findAll(@Param('projectId') projectId: string) {
    try {
      console.log("FIND ALL IS RUNING")
      return await this.tasksService.findAll(projectId);
    } catch (err) {
      console.log('Error in get all tasks controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
        // console.log(id, userId)
      return await this.tasksService.findById(id);
    } catch (err) {
      console.log('Error in get task by id controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    try {
        console.log(id, dto)
      return await this.tasksService.update(id, dto);
    } catch (err) {
      console.log('Error in update task controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body('userId') userId: string) {
    try {
      return await this.tasksService.delete(id, userId);
    } catch (err) {
      console.log('Error in delete task controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }

  @Get('filter/status')
async filterByStatus(@Body() filterTaskDto: FilterTaskDto) {
    try {
        // const {status , taskId} = body;
        const { status , projectId } = filterTaskDto;
      return await this.tasksService.filterByStatus(status, projectId);
    } catch (err) {
      console.log('Error in filter task controller', err);
      return { success: false, status: 500, message: 'Something went wrong' };
    }
  }
}
