class OrganizationsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: { data: @organizations, total: @organizations.size }
  end

  def show
    render json: @organization
  end

  def create
    if @organization.save
      render json: organization
    else
      render json: { }, status: :unprocessable_entity
    end
  end

  def update
    if @organization.update(organization_params)
      render json: @organization
    else
      render json: { }, status: unprocessable_entity
    end
  end

  private

  def organization_params
    params.permit(:name, :id)
  end
end
