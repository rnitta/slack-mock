# frozen_string_literal: true
class Message < ApplicationRecord
  belongs_to :workspace, primary_key: :sender_id, dependent: :destroy
end
