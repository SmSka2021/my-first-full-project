import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';
import { TaskModel } from './schemas/task.schema';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name)
    private readonly taskModel: Model<TaskModel>,
  ) {}

  async createTask(userId: string, taskDto: TaskDto) {
    const task = await this.taskModel.create(taskDto);
    return task;
  }

  async getAllTasks() {
    return await this.taskModel.find();
  }

  async getOneTask(id: string) {
    return this.taskModel.findById(id);
  }

  async deleteTask(id: string) {
    const task = this.taskModel.findById(id);
    if (task) {
      return this.taskModel.findByIdAndRemove(id);
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async updateTask(idTask: string, taskNew: TaskDto) {
    const oldTask = this.taskModel.findById(idTask);
    if (oldTask) {
      await this.taskModel.updateOne(
        { _id: idTask },
        {
          $set: {
            description: taskNew.description,
            title: taskNew.title,
          },
        },
      );
      return this.taskModel.findById(idTask);
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
}
