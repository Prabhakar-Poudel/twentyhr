module ApplicationHelper
  def reset_password_link(token:)
    "#{web_client_url}reset-password?token=#{token}"
  end

  def web_client_url
    ENV.fetch("RAILS_ENV", "development") == "production" ? "https://www.twentyhr.com/" : "http://localhost:3101/"
  end
end
