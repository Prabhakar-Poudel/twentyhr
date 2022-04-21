import { IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organizationId?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}

export class UpdateUserRequest {
  @IsString()
  id: string;

  @IsString()
  email?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}

export class UserResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  organizationId?: string;
}
