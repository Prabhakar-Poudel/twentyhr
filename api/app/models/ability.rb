# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?
    can [:read, :update], User, id: user.id
    can [:read, :create, :update], InterviewQuestion, creator: user
    can [:read], Organization, id: user.organization_id
  end
end
