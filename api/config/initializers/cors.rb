# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    if Rails.env.development?
      origins %w[http://localhost:3101 http://localhost:8001]
    else
      origins %w[https://www.twentyhr.com https://app.twentyhr.com]
    end

    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end

Rails.application.config.action_cable.allowed_request_origins = %w[http://localhost:3101 https://www.twentyhr.com https://app.twentyhr.com]
