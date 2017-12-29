class AddStaredToChannelUser < ActiveRecord::Migration[5.1]
  def change
    add_column :channel_users, :stared, :boolean, default: false
  end
end
