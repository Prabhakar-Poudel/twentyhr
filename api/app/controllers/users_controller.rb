class UsersController < ApplicationController
  load_and_authorize_resource except: [:profile]

  def index
    render json: @users
  end

  def show
    render json: @user
  end

  def profile
    authorize! :read, current_user
    render json: current_user
  end

  def update
    @user.update!(update_params)
    render json: @user
  rescue ActiveRecord::ValueTooLong
    render json: { error: 'Value too long' }, status: :bad_request
  end

  private

  def update_params
    params.require(:user).permit(:name, :organization_id)
  end
end
