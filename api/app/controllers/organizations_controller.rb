class OrganizationsController < ApplicationController
  load_and_authorize_resource except: %i[overview]

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

  def overview
    authorize! :read, current_organization
    render json: {
      users: User.accessible_by(current_ability).where(organization: current_organization).count,
      interviews: Interview.accessible_by(current_ability).where(organization: current_organization).count
    }
  end

  private

  def organization_params
    params.permit(:name, :id)
  end
end
