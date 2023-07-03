import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TaskModel } from 'src/tasks/schemas/task.schema';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: false,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Types.ObjectId] })
  friends: Types.ObjectId[];

  @Prop()
  tasks: TaskModel[];
}

export const UserSchema = SchemaFactory.createForClass(User);
