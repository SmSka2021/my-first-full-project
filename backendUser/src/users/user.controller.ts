import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TaskDto } from 'src/tasks/dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nick/:nickName')
  findOneByName(@Param('nickName') nickName: string) {
    return this.userService.findByNickNameUser(nickName);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idUser/task/:idTask')
  removeTask(@Param('idTask') idTask: string, @Param('idUser') idUser: string) {
    return this.userService.deleteTaskToCurrentUser(idUser, idTask);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/task')
  createTaskUser(@Param('id') id: string, @Body() tasksDto: TaskDto) {
    return this.userService.addTaskToCurrentUser(id, tasksDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idUser/task/:idTask')
  updateTaskUser(
    @Param('idTask') idTask: string,
    @Param('idUser') idUser: string,
    @Body() task: TaskDto,
  ) {
    return this.userService.updateTaskToCurrentUser(idTask, idUser, task);
  }

  @UseGuards(JwtAuthGuard)
  @Post('friend')
  addFriendUser(@Body() { idUser, idFriend }) {
    return this.userService.addFriend(idUser, idFriend);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':idUser/friend/:idFriend')
  removeFriendUser(
    @Param('idUser') idUser: string,
    @Param('idFriend') idFriend: string,
  ) {
    return this.userService.removeFriend(idUser, idFriend);
  }
}
