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
    InterviewChannel.broadcast_to(interview, payload)

    case payload['type']
    when 'start_interview'
      interview.start!
    when 'interview_ended'
      interview.end!
      ActiveInterview.remove_all(interview)
    when 'code_updated'
      interview.update_interview!(code: payload['data']['code'])
    when 'draw_updated'
      interview.update_interview!(drawing: payload['data']['elements'])
    when 'title_changed'
      interview.update_interview!(title: payload['data']['title'])
    when 'question_changed'
      interview.update_interview!(question_id: payload['data']['question'])
    end
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
