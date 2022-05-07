class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto'

    create_table :organizations, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name

      t.timestamps
    end
  end
end
