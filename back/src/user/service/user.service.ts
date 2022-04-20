import { Injectable } from '@nestjs/common'
import { CreateUserRequest, UpdateUserRequest } from 'src/user/dto/user';
import { User } from 'src/user/entity/User.entity';

@Injectable()
export class UserService {
  index() {
    return User.findAndCount().then(([users, total]) => ({
      data: users,
      total,
    }));
  }

  show(id) {
    return User.findOne({ where: [{ id }] });
  }

  create(params: CreateUserRequest) {
    const user = User.create(params);
    return user.save();
  }

  async update(params: UpdateUserRequest) {
    const user = await User.findOne({ where: [{ id: params.id }] });
    return user.save({ data: params });
  }
}
