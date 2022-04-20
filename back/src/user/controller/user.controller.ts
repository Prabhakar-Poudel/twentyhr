import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/user/dto/user';
import { UserService } from 'src/user/service/user.service';

@Controller('accounts')
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
  create(@Body() accountData: CreateUserRequest): Promise<UserResponse> {
    return this.usersService.create(accountData);
  }

  @Put()
  update(@Body() accountData: UpdateUserRequest): Promise<UserResponse> {
    return this.usersService.update(accountData);
  }
}
