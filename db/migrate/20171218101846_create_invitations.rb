class CreateInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :invitations do |t|
      t.string :token
      t.string :email
      t.references :user, foreign_key: true
      t.references :workspace, foreign_key: true

      t.timestamps
    end
  end
end
