module ApplicationHelper
  def reset_password_link(token:)
    "#{web_client_url}reset-password?token=#{token}"
  end

  def verify_account_link(token:)
    "#{web_client_url}verify-account?token=#{token}"
  end

  def unlock_url(token:)
    "#{web_client_url}unlock-account?token=#{token}"
  end

  def web_client_url
    ENV.fetch("RAILS_ENV", "development") == "production" ? "https://www.twentyhr.com/" : "http://localhost:3101/"
  end
end
