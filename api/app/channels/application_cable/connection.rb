module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      current_user = env['warden'].user
      return current_user if current_user.present?
      guest_user = cookies['guest_user']
      return User.new(JSON.parse(guest_user)) if guest_user

      reject_unauthorized_connection
    end
  end
end
