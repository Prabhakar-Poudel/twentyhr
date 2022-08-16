class Interview < ApplicationRecord
  belongs_to :organization, required: true
  belongs_to :creator, class_name: 'User', required: true
  belongs_to :question, required: false

  validates :title, presence: true

  enum status: { created: 'created', started: 'started', ended: 'ended', archived: 'archived' }, _default: 'created'

  def end!
    self.update!(status: 'ended')
  end

  def start!
    self.update!(status: 'started')
  end

  def update_interview!(attributes)
    if self.ended?
      raise ActiveModel::UnknownAttributeError, message: 'This interview has ended'
    else
      self.update!(**attributes)
    end
  end
end
