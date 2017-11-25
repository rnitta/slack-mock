# frozen_string_literal: true
class EmailConfirmation < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :address, presence: true, length: { maximum: 255 },
                      format: { with: VALID_EMAIL_REGEX },
                      uniqueness: { case_sensitive: false }
  before_save { self.address = address.downcase }
  validates :code, presence: true
  validates :token, presence: true
end
