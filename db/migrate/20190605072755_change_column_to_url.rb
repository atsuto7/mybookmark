class ChangeColumnToUrl < ActiveRecord::Migration[5.0]
  def change
    def up
      change_column :urls, :url, :text
    end
  
    # 変更前の状態
    def down
      change_column :urls, :url, :string
    end
  end
end
