import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dtos/createUser.dto'
import { UserService } from 'src/user/service/user.service'

@Controller('account')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  index(): string {
    return `Hello from users -> all users`
  }


  @Get(':id')
  show(@Param() params): string {
    return `Hello from accounts -> ${params.id}`
  }

  @Post()
  create(@Body() accountData: CreateUserDto): CreateUserDto {
    return this.usersService.create(accountData)
  }
}
