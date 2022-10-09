class AddLanguageToInterview < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :language, :string
  end
end
