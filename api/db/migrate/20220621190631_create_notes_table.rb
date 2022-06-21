class CreateNotesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :notes, id: :uuid do |t|
      t.references :author, type: :uuid, index: true, null: false, foreign_key: { to_table: 'users' }
      t.references :interview, type: :uuid, index: true, null: false, foreign_key: true
      t.text :content, null: true
      t.timestamps
    end
  end
end
