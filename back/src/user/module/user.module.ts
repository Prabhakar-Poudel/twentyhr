import { Module } from '@nestjs/common'
import { UserController } from 'src/user/controller/user.controller'
import { UserService } from 'src/user/service/user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
