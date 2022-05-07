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
    super
  end
end
