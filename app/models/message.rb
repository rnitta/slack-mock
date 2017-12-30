# frozen_string_literal: true
class Message < ApplicationRecord
  belongs_to :user, foreign_key: :sender_id, dependent: :destroy
  belongs_to :workspace
end
