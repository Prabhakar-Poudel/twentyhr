# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can %i[read], Interview, status: :started

    return if user.blank?

    can %i[read update], User, id: user.id
    can %i[read], User, organization: user.organization
    can %i[read create update], Note, author: user
    can %i[read create update], Question, organization: user.organization
    can %i[read create update], Interview, organization: user.organization
    can %i[read], Organization, id: user.organization_id
  end
end
