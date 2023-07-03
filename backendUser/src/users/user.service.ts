import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { TaskDto } from 'src/tasks/dto/task.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly tasksService: TasksService,
  ) {}

  async findByPayload(options?: object): Promise<UserDto> {
    const user = await this.userModel.findOne(options).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const userInDb = await this.findByNickNameUser(createUserDto.nickName);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return this.findOne(id);
  }

  async findOneForAuth(username: string): Promise<UserDto | undefined> {
    return await this.userModel.findOne({ name: username }).exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  async findByNickNameUser(nickNameUser: string): Promise<UserDto> {
    return await this.userModel.findOne({ nickName: nickNameUser }).exec();
  }

  async findByName(nameUser: string): Promise<UserDto> {
    return await this.userModel.findOne({ name: nameUser }).exec();
  }

  async addTaskToCurrentUser(_id: string, tasksDto: TaskDto) {
    const task = await this.tasksService.createTask(_id, tasksDto);
    await this.userModel.updateOne({ _id }, { $push: { tasks: task } });
    return await this.findOne(_id);
  }

  async deleteTaskToCurrentUser(_id: string, _idTask: string) {
    const task = await this.tasksService.deleteTask(_idTask);
    await this.userModel.updateOne({ _id }, { $pull: { tasks: task } });
  }

  async updateTaskToCurrentUser(idTask: string, _id: string, task: TaskDto) {
    const oldTask = await this.tasksService.getOneTask(idTask);
    const tasksNew = await this.tasksService.updateTask(idTask, task);
    await this.userModel.updateOne({ _id }, { $pull: { tasks: oldTask } });
    await this.userModel.updateOne({ _id }, { $push: { tasks: tasksNew } });
    return await this.findOne(_id);
  }

  async addFriend(idUser: string, idFriend: string) {
    await this.userModel.updateOne(
      { _id: idUser },
      { $push: { friends: idFriend } },
    );
    await this.userModel.updateOne(
      { _id: idFriend },
      { $push: { friends: idUser } },
    );
    return await this.findOne(idUser);
  }

  async removeFriend(idUser: string, idFriend: string) {
    await this.userModel.updateOne(
      { _id: idUser },
      { $pull: { friends: idFriend } },
    );
    await this.userModel.updateOne(
      { _id: idFriend },
      { $pull: { friends: idUser } },
    );
    return await this.findOne(idUser);
  }
}
