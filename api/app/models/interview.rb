class Interview < ApplicationRecord
  belongs_to :organization, required: true
  belongs_to :creator, class_name: 'User', required: true
  belongs_to :question, required: false

  validates :title, presence: true

  enum status: { created: 'created', started: 'started', ended: 'ended', archived: 'archived' }, _default: 'created'
end
