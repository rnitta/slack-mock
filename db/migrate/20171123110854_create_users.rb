class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :user_name
      t.string :display_name
      t.integer :status
      t.integer :invited_by
      t.integer :role
      t.string :phone
      t.string :skype
      t.string :profile_img
      t.string :workspace_id

      t.timestamps
    end
    add_index :users, [:email, :workspace_id], unique: true
  end
end
