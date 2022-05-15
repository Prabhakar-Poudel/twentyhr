class InterviewQuestion < ApplicationRecord
  belongs_to :organization, required: true
  belongs_to :creator, class_name: 'User', required: true

  enum status: { draft: 'draft', published: 'published', archived: 'archived' }, _default: 'draft'
end
