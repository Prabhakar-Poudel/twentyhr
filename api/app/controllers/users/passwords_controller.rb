class Users::PasswordsController < Devise::PasswordsController
  # GET /users/password/new
  def new
    raise ActionController::RoutingError.new('Not Found')
  end

  # POST /users/password
  def create
    super
  end

  # GET /users/password/edit?reset_password_token=abcdef
  def edit
    raise ActionController::RoutingError.new('Not Found')
  end

  # PUT /users/password
  def update
    super
  end
end
