class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  before_action :set_paper_trail_whodunnit

  helper_method :current_organization

  respond_to :json

  check_authorization unless: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up)
    devise_parameter_sanitizer.permit(:account_update)
  end

  def current_organization
    @current_organization ||=
      if params[:organization_id].present?
        Organization.find(params[:organization_id])
      else
        current_user.organization
      end
  end
end
