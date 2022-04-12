import { CreateUserDto } from 'src/user/dtos/createUser.dto'

export interface User extends CreateUserDto {
  name: string
}
