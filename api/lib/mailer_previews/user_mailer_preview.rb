class UserMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    UserMailer.confirmation_instructions(User.new(email: 'rick.sanchez@example.com'), "token123fake#@@")
  end

  def email_changed
    UserMailer.email_changed(User.new(email: 'rick.sanchez@example.com', name: 'Rick Sanchez'))
  end

  def password_change
    UserMailer.password_change(User.new(email: 'rick.sanchez@example.com', name: 'Rick Sanchez'))
  end

  def reset_password_instructions
    UserMailer.reset_password_instructions(User.new(email: 'rick.sanchez@example.com', name: 'Rick Sanchez'), "token123fake#@@")
  end

  def unlock_instructions
    UserMailer.unlock_instructions(User.new(email: 'rick.sanchez@example.com', name: 'Rick Sanchez'), "token123fake#@@")
  end
end
