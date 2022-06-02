class CreateInterviewsTable < ActiveRecord::Migration[7.0]
  def up
    create_enum :interview_status, %w[created started ended archived]

    create_table :interviews, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :organization, type: :uuid, index: true, null: false, foreign_key: true
      t.references :creator, type: :uuid, index: true, null: false, foreign_key: { to_table: 'users' }
      t.references :question, type: :uuid, null: true, foreign_key: true
      t.string :title, null: false, limit: 300
      t.enum :status, enum_type: :interview_status, default: 'created', null: false
      t.timestamps
    end
  end

  def down
    drop_table :interviews

    execute <<-SQL
      DROP TYPE interview_status;
    SQL
  end
end
