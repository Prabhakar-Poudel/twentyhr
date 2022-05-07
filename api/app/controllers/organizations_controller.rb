class OrganizationsController < ApplicationController
  def show
    organization = Organization.find(params[:id])
    render json: { data: organization }
  end

  def index
    organizations = Organization.all
    render json: { data: organizations, total: organizations.size }
  end

  def create
    organization = Organization.create(organization_params)
    if organization.save
      render json: { data: organization }
    else
      render json: { }, status: unprocessable_entity
    end
  end

  def update
    organization = Organization.find(params[:id])
    if organization.update(organization_params)
      render json: { data: organization }
    else
      render json: { }, status: unprocessable_entity
    end
  end

  private

  def organization_params
    params.permit(:name)
  end
end
