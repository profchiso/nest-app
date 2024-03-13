import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user-dto';
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

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(Number(id));
  }

  @Get()
  findAllUsers(@Query() query: Partial<User>) {
    console.log(query);
    return this.userService.findAllUsers();
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.userService.updateUser(Number(id), user);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(Number(id));
  }
}
