import { Module } from '@nestjs/common'
import { AppController } from 'src/application/controller/app.controller'
import { AppService } from 'src/application/service/app.service'
import { UserModule } from 'src/user/module/user.module'

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
