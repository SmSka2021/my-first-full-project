import { Types } from 'mongoose';
import { TaskInterface } from 'src/tasks/interfaces/task.interface';

export class User {
  name: string;
  email: string;
  password: string;
  nickName: string;
  tasks: TaskInterface[];
  friends: Types.ObjectId[];
}
