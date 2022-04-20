import { Injectable } from '@nestjs/common';
import {
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from 'src/organization/dto/organization.dto';
import { Organization } from 'src/organization/entity/Organization.entity';

@Injectable()
export class OrganizationService {
  index() {
    return Organization.findAndCount().then(([organizations, total]) => ({
      data: organizations,
      total,
    }));
  }

  show(id: string) {
    return Organization.findOne({ where: [{ id }] });
  }

  create(params: CreateOrganizationRequest) {
    const organization = Organization.create(params);
    return organization.save();
  }

  async update(params: UpdateOrganizationRequest) {
    const organization = await Organization.findOne({
      where: [{ id: params.id }],
    });
    return organization.save({ data: params });
  }
}
