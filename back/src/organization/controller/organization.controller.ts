import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import {
  CreateOrganizationRequest,
  OrganizationResponse,
  UpdateOrganizationRequest,
} from 'src/organization/dto/organization.dto';
import { OrganizationService } from 'src/organization/service/organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  index(): Promise<{ data: OrganizationResponse[]; total: number }> {
    return this.organizationService.index();
  }

  @Get(':id')
  show(@Param() params): Promise<OrganizationResponse> {
    return this.organizationService.show(params.id);
  }

  @Post()
  create(
    @Body() accountData: CreateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.organizationService.create(accountData);
  }

  @Put()
  update(
    @Body() accountData: UpdateOrganizationRequest,
  ): Promise<OrganizationResponse> {
    return this.organizationService.update(accountData);
  }
}
