import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskInterface } from '../interfaces/task.interface';

@Schema({ collection: 'tasks', timestamps: true, versionKey: false })
export class TaskModel extends Document implements TaskInterface {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  title: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
