class ActiveInterview < ApplicationRecord
  PREFIX = 'active_interview'.freeze

  @@redis ||= Redis.new(url: ENV.fetch('REDIS_URL') { 'redis://localhost:6380/1' })

  class << self
    def all_users(interview)
      @@redis.smembers(interview_key(interview))
    end

    def remove_all(interview)
      @@redis.del(interview_key(interview))
    end

    def add_user(interview, user)
      @@redis.sadd(interview_key(interview), user_to_value(user))
    end

    def active?(interview, user)
      @@redis.sismember(interview_key(interview), user_to_value(user))
    end

    def remove(interview, user)
      @@redis.srem(interview_key(interview), user_to_value(user))
    end

    private

    def user_to_value(user)
      user.to_json(only: [:id, :name]).to_s
    end

    def interview_key(interview)
      "#{PREFIX}_#{interview.id}"
    end
  end
end
