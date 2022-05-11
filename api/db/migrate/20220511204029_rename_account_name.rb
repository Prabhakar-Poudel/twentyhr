class RenameAccountName < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string, limit: 50, null: true
    remove_columns :users, :first_name, :last_name
  end
end
