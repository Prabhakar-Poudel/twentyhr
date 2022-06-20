class InterviewChannel < ApplicationCable::Channel
  def subscribed
    reject unless interview && Ability.new(current_user).can?(:edit, interview)
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
    when 'start_interview'
      interview.start!
    when 'end_interview'
      interview.end!
    when 'code_updated'
      interview.update!(code: payload['data']['code'])
    when 'draw_updated'
      interview.update!(drawing: payload['data']['elements'])
    when 'title_changed'
      interview.update!(title: payload['data']['title'])
    when 'language_changed'
      interview.update!(language: payload['data']['language'])
    when 'question_changed'
      interview.update!(question: payload['data']['question'])
    end
    InterviewChannel.broadcast_to(interview, payload)
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
