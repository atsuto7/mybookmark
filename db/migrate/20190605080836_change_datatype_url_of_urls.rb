class ChangeDatatypeUrlOfUrls < ActiveRecord::Migration[5.0]
  def change
    change_column :urls, :url, :text
  end
end
