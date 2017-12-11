# frozen_string_literal: true
class Channel < ApplicationRecord
  belongs_to :workspace
  has_many :channel_users
  has_many :users, through: :channel_users
end
