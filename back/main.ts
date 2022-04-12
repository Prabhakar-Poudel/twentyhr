import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/application/module/app.module'

async function startApp() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3100)
}

startApp()
