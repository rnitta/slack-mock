class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.references :workspace, foreign_key: true
      t.string :name
      t.boolean :public
      t.string :topic, default: true, null: false
      t.integer :count, default: 0

      t.timestamps
    end
  end
end
