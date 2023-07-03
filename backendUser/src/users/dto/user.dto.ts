import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { TaskDto } from '../../tasks/dto/task.dto';
import { Types } from 'mongoose';

export class UserDto {
  _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  nickName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  tasks: TaskDto[];

  @IsNotEmpty()
  friends: Types.ObjectId[];
}
