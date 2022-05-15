class OrganizationsController < ApplicationController
  load_and_authorize_resource

  def show
    render json: { data: @organization }
  end

  def index
    render json: { data: @organizations, total: @organizations.size }
  end

  def create
    if @organization.save
      render json: { data: organization }
    else
      render json: { }, status: unprocessable_entity
    end
  end

  def update
    if @organization.update(organization_params)
      render json: { data: @organization }
    else
      render json: { }, status: unprocessable_entity
    end
  end

  private

  def organization_params
    params.permit(:name)
  end
end
