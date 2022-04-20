import { Controller, Get } from '@nestjs/common'
import { AppService } from 'src/application/service/app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
