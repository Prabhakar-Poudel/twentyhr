class UsersController < ApplicationController
  load_and_authorize_resource :except => [:profile]

  def show
    render json: { data: @user }
  end

  def profile
    authorize! :read, current_user
    render json: current_user
  end

  def index
    render json: { data: @users, total: @users.size }
  end

  def update
    @user.update!(update_params)
    render json: { data: @user }
  rescue ActiveRecord::ValueTooLong
    render json: { error: 'Value too long' }, status: :bad_request
  end

  private

  def update_params
    params.require(:user).permit(:name, :organization_id)
  end
end
