class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :workspace, foreign_key: true
      t.references :sender, null: false
      t.integer :receiver_type, null: false
      t.references :receiver, null: false
      t.text :message, null: false
      t.timestamps
    end
    add_foreign_key :messages, :users, column: :sender_id
  end
end
