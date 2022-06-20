class AddCodeAndDrawingToInterview < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :code, :string, null: true
    add_column :interviews, :drawing, :jsonb, null: true
  end
end
