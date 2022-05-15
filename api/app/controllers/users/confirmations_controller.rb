# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /users/confirmation/new
  def new
    raise ActionController::RoutingError.new('Not Found')
  end

  # POST /users/confirmation
  def create
    super
  end

  # GET /users/confirmation?confirmation_token=abcdef
  def show
    super do |user|
      create_user_organization(user) if user.errors.empty? && user.organization.nil?
    end
  end

  private

  def create_user_organization(user)
    organization = Organization.create(name: user.email)
    user.update!(organization: organization)
  end
end
