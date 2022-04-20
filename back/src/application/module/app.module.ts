import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/application/controller/app.controller';
import { AppService } from 'src/application/service/app.service';
import { OrganizationModule } from 'src/organization/module/organization.module';
import { UserModule } from 'src/user/module/user.module';

@Module({
  imports: [
    UserModule,
    OrganizationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'thr-dev',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/data/migrations/*{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
