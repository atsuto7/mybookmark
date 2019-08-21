class AddTitleToUrl < ActiveRecord::Migration[5.0]
  def change
    add_column :urls, :title, :string, null: false
  end
end
