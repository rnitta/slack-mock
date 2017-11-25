# frozen_string_literal: true
class CreateEmailConfirmations < ActiveRecord::Migration[5.1]
  def change
    create_table :email_confirmations do |t|
      t.string :address
      t.string :code
      t.string :token

      t.timestamps
    end
    add_index :email_confirmations, :address, unique: true
  end
end
