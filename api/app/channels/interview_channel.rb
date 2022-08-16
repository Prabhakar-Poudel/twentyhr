class InterviewChannel < ApplicationCable::Channel
  def subscribed
    reject unless interview
    ActiveInterview.add_user(interview, current_user)
    stream_for interview
    send_active_users
  end

  def unsubscribed
    ActiveInterview.remove(interview, current_user)
    send_active_users
  end

  def receive(payload)
    case payload['type']
    when 'interview_ended'
      return unless can_update_interview?
      interview.end!
      InterviewChannel.broadcast_to(interview, payload)
      ActiveInterview.remove_all(interview)
    when 'code_updated'
      interview.update_interview!(code: payload['data']['code'])
      InterviewChannel.broadcast_to(interview, payload)
    when 'draw_updated'
      interview.update_interview!(drawing: payload['data']['elements'])
      InterviewChannel.broadcast_to(interview, payload)
    when 'title_changed'
      return unless can_update_interview?
      interview.update_interview!(title: payload['data']['title'])
      InterviewChannel.broadcast_to(interview, payload)
    when 'question_changed'
      return unless can_update_interview?
      interview.update_interview!(question_id: payload['data']['question'])
      InterviewChannel.broadcast_to(interview, payload)
    end
  end

  private

  def interview
    @interview ||= Interview.find_by(id: params[:id], status: :started)
  end

  def can_update_interview?
    Ability.new(current_user).can?(:update, interview)
  end

  def send_active_users
    InterviewChannel.broadcast_to(interview, { type: 'active_users', data: active_users_decoded })
  end

  def active_users_decoded
    ActiveInterview.all_users(interview).map { |user| ActiveSupport::JSON.decode(user) }
  end
end
