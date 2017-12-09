# frozen_string_literal: true
class ChannelUser < ApplicationRecord
  belongs_to :user
  belongs_to :channel
end
