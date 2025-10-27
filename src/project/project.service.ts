import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {

  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(createProjectDto: CreateProjectDto ): Promise<ProjectDocument> {
    try {
      const createdProject = new this.projectModel(createProjectDto);
      const savedProject = await createdProject.save();
      return savedProject;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create project');
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    try {
      const updatedProject = await this.projectModel
        .findByIdAndUpdate(id, updateProjectDto, { new: true })
        .exec();
      if (!updatedProject) {
        throw new BadRequestException('Project not found');
      }
      return updatedProject;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update project');
    }
  }

  async delete(id: string): Promise<ProjectDocument> {
    try {
      const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
      if (!deletedProject) {
        throw new BadRequestException('Project not found');
      }
      return deletedProject;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete project');
    }
  }

   async getAllProjectsByUserId(userId: string): Promise<ProjectDocument[]> {
    try {
      const projects = await this.projectModel.find({userId}).exec();
      return projects;
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to fetch projects');
    }
  }
}
