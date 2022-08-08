class UserMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    UserMailer.confirmation_instructions(User.new(email: 'rick.sanchez@example.com'), "token123fake#@@")
  end
end
