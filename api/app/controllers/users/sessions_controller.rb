# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  # before_action :configure_sign_in_params, only: [:create]
  skip_before_action :verify_signed_out_user

  # GET /users/sign_in
  def new
    raise ActionController::RoutingError.new('Not Found')
  end

  # POST /users/sign_in
  def create
    super
  end

  # DELETE /users/sign_out
  def destroy
    success = sign_out
    render json: {}, status: :ok
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  # end
end
