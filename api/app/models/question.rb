class Question < ApplicationRecord
  belongs_to :organization, required: true
  belongs_to :creator, class_name: 'User', required: true

  validates :title, presence: true

  enum status: { draft: 'draft', published: 'published', archived: 'archived' }, _default: 'draft'
end
