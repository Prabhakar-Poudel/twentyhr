class Question < ApplicationRecord
  belongs_to :organization
  belongs_to :creator, class_name: 'User'

  validates :title, presence: true

  enum status: { draft: 'draft', published: 'published', archived: 'archived' }, _default: 'draft'
end
