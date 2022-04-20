export class CreateOrganizationRequest {
  name: string;
  accountManagerId?: string;
}

export class UpdateOrganizationRequest {
  id: string;
  name?: string;
  accountManagerId?: string;
}

export class OrganizationResponse {
  id: string;
  name: string;
  accountManagerId?: string;
}
