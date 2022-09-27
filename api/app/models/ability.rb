# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return if user.blank?

    can [read, update], User, id: user.id
    can [read, create, update], Note, author: user
    can [read, create, update], Question, organization: user.organization
    can [read, create, update], Interview, organization: user.organization
    can [read], Organization, id: user.organization_id
  end
end
