class Note < ApplicationRecord
  belongs_to :author, class_name: 'User', required: true
  belongs_to :interview, required: false
end
