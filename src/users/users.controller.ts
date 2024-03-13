import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Post('/login')
  async login() {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(Number(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAllUsers(@Query() query: Partial<User>) {
    console.log(query);
    return this.userService.findAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.updateUser(Number(id), user);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(Number(id));
  }
}
