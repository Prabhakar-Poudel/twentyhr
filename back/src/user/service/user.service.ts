import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/user/dtos/createUser.dto'
import { User } from 'src/user/interface/user.interface'

@Injectable()
export class UserService {
  private readonly users: User[] = []

  create(user: CreateUserDto) {
    this.users.push(user as User)
    return user
  }

  index(): User[] {
    return this.users
  }
}
