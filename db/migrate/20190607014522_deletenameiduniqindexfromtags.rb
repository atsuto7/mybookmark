class Deletenameiduniqindexfromtags < ActiveRecord::Migration[5.0]
  def change
    remove_index :tags, :name
  end
end
