class CreateUrls < ActiveRecord::Migration[5.0]
  def change
    create_table :urls do |t|
      t.string :url 
      t.text :memo
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
