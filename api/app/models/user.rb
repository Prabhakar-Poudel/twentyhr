class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable, :trackable and :omniauthable
  devise :confirmable, :database_authenticatable, :lockable, :registerable,
         :recoverable, :rememberable, :validatable
  belongs_to :organization, optional: true

  has_paper_trail

  enum role: { admin: 'admin', archived: 'archived', member: 'member', staff: 'staff' }, _default: 'member'
end
