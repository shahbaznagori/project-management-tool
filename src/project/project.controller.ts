import { 
  Controller, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  BadRequestException, 
  HttpStatus, 
  Get,
  Req
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
        console.log(createProjectDto)
      const project = await this.projectService.create(createProjectDto);
      return {
        success: true,
        status: HttpStatus.CREATED,
        data: project,
      };
    } catch (error: any) {
      console.log('Create Project Error:', error);
      throw new BadRequestException(error.message || 'Failed to create project');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    try {
      const updatedProject = await this.projectService.update(id, updateProjectDto);
      return {
        success: true,
        status: HttpStatus.OK,
        data: updatedProject,
      };
    } catch (error: any) {
      console.log('Update Project Error:', error);
      throw new BadRequestException(error.message || 'Failed to update project');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const deletedProject = await this.projectService.delete(id);
      return {
        success: true,
        status: HttpStatus.OK,
        data: deletedProject,
      };
    } catch (error: any) {
      console.log('Delete Project Error:', error);
      throw new BadRequestException(error.message || 'Failed to delete project');
    }
  }


   @UseGuards(JwtAuthGuard)
   @Get()
  async getAll(@Req() req: any) {
    try {
      console.log("THIS IS RUNNING")
      const userId = req.user.userId; // populated by JwtAuthGuard
      console.log("USERID", userId)
      const projects = await this.projectService.getAllProjectsByUserId(userId);
      return {
        success: true,
        status: HttpStatus.OK,
        data: projects,
      };
    } catch (error: any) {
      console.log('Fetch Projects Error:', error);
      return {
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to fetch projects',
      };
    }
  }
}
