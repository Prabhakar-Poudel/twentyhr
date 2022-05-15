class CreateQuestionsTable < ActiveRecord::Migration[7.0]
  def up
    create_enum :question_status, %w[draft published archived]

    create_table :interview_questions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :organization, type: :uuid, index: true, null: false, foreign_key: true
      t.references :creator, type: :uuid, index: true, null: false, foreign_key: { to_table: 'users' }
      t.string :title, null: false
      t.string :description, null: true, limit: 500
      t.text :candidate_instruction, null: true
      t.text :initial_code, null: true
      t.text :guidelines, null: true
      t.enum :status, enum_type: :question_status, default: 'draft', null: false
      t.timestamp :last_used_at, null: true
      t.timestamps
    end
  end

  def down
    drop_table :interview_questions

    execute <<-SQL
      DROP TYPE question_status;
    SQL
  end
end
