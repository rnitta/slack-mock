# frozen_string_literal: true
class Channel < ApplicationRecord
  belongs_to :workspace
  has_many :user, through: :channel_user
  has_many :channel_user
end
