class AddRelations < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :organization, foreign_key: true, type: :uuid, index: true
  end
end
