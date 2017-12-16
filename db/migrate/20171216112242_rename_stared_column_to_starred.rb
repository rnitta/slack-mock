class RenamestarredColumnToStarred < ActiveRecord::Migration[5.1]
  def change
    rename_column :channel_users, :stared, :starred
  end
end
