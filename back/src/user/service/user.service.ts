import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Organization } from 'src/organization/entity/Organization.entity';
import { CreateUserRequest, UpdateUserRequest } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/User.entity';

@Injectable()
export class UserService {
  async index() {
    const [users, total] = await User.findAndCount({ loadRelationIds: true });
    return { data: users, total };
  }

  async show(id) {
    const user = await User.findOne({ where: [{ id }] });
    return user;
  }

  async create(params: CreateUserRequest) {
    const user = User.create(params);
    try {
      user.organization = await Organization.findOneBy({
        id: params.organizationId,
      });
      await user.save();
    } catch (QueryFailedError) {
      throw new UnprocessableEntityException();
    }
    return user;
  }

  async update(params: UpdateUserRequest) {
    const user = await User.findOneBy({ id: params.id });
    return user.save({ data: params });
  }
}
