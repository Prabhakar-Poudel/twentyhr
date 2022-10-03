class Users::GuestSessionsController < ApplicationController
  skip_before_action :authenticate_user!, only:  %i[create]

  def create
    name = params.require(:guest_name)
    interview = Interview.includes(:organization).find(params.require(:interview_id))
    authorize! :read, interview
    user = User.new(name:, id: SecureRandom.uuid)
    response.set_cookie(
      :guest_user,
      {
        value: user.to_json,
        expires: 24.hours.from_now,
        secure: true,
        httponly: true
      }
    )
    render json: user , status: :ok
  end
end
