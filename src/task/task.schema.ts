import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true }) // adds createdAt & updatedAt
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: String, 
    enum: ['todo', 'in-progress', 'done'], 
    default: 'todo' 
  })
  status: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  userId?: Types.ObjectId; 
}

export const TaskSchema = SchemaFactory.createForClass(Task);
