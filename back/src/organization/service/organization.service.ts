import { Injectable } from '@nestjs/common';
import {
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from 'src/organization/dto/organization.dto';
import { Organization } from 'src/organization/entity/Organization.entity';
import { User } from 'src/user/entity/User.entity';

@Injectable()
export class OrganizationService {
  index() {
    return Organization.findAndCount({ loadRelationIds: true }).then(
      ([organizations, total]) => ({
        data: organizations,
        total,
      }),
    );
  }

  show(id: string) {
    return Organization.findOne({ where: [{ id }] });
  }

  async create(params: CreateOrganizationRequest) {
    const organization = Organization.create(params);
    organization.accountManager = await User.findOneBy({
      id: params.accountManagerId,
    });
    return organization.save();
  }

  async update(params: UpdateOrganizationRequest) {
    const organization = await Organization.findOneBy({ id: params.id });
    return organization.save({ data: params });
  }
}
