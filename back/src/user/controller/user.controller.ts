import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/user/dto/user.dto';
import { UserService } from 'src/user/service/user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  index(): Promise<{ data: UserResponse[]; total: number }> {
    return this.usersService.index();
  }

  @Get(':id')
  show(@Param() params): Promise<UserResponse> {
    return this.usersService.show(params.id);
  }

  @Post()
  create(@Body() params: CreateUserRequest): Promise<UserResponse> {
    return this.usersService.create(params);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() params: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.update(params);
  }
}
