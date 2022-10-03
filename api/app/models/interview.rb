class Interview < ApplicationRecord
  belongs_to :organization
  belongs_to :creator, class_name: 'User'
  belongs_to :question

  validates :title, presence: true

  enum status: { created: 'created', started: 'started', ended: 'ended', archived: 'archived' }, _default: 'created'

  def end!
    update!(status: :ended)
  end

  def start!
    update!(status: :started)
  end

  def update_interview!(attributes)
    raise ActiveModel::UnknownAttributeError, message: 'This interview has ended' if ended?

    update!(**attributes)
  end
end
