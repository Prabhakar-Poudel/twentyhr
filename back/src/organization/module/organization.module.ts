import { Module } from '@nestjs/common'
import { OrganizationController } from 'src/organization/controller/organization.controller'
import { OrganizationService } from 'src/organization/service/organization.service'

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
