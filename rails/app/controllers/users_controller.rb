class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: { data: user }
  end

  def profile
    render json: current_user
  end

  def index
    users = User.all
    render json: { data: users, total: users.size }
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :organization_id, :email)
  end
end
