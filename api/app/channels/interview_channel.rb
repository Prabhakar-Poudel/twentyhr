class InterviewChannel < ApplicationCable::Channel
  def subscribed
    reject unless interview && Ability.new(current_user).can?(:edit, interview)
    ActiveInterview.add(interview, current_user)
    stream_for interview
    send_active_users
  end

  def unsubscribed
    ActiveInterview.remove(interview, current_user)
    send_active_users
  end

  def receive(data)
    InterviewChannel.broadcast_to(interview, data)
  end

  private

  def interview
    @interview ||= Interview.find_by(id: params[:id], status: :started)
  end

  def send_active_users
    InterviewChannel.broadcast_to(interview, { type: 'active_users', data: active_users_decoded })
  end

  def active_users_decoded
    ActiveInterview.all_users(interview).map { |user| ActiveSupport::JSON.decode(user) }
  end
end
