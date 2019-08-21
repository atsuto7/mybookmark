class CreateUrlTags < ActiveRecord::Migration[5.0]
  def change
    create_table :url_tags do |t|
      t.references :url, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
