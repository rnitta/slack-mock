# frozen_string_literal: true
class AddDomainToWorkspace < ActiveRecord::Migration[5.1]
  def change
    add_column :workspaces, :domain, :string
    add_index :workspaces, :domain, unique: true
  end
end
