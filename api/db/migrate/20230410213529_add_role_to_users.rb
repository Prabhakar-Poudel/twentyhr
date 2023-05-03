class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def change
    create_enum :role_enum, %w[admin archived member staff]

    add_column :users, :role, :enum, enum_type: 'role_enum', default: 'member', null: false
  end
end
