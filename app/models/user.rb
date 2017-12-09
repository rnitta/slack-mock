# Frozen_String_Literal: true
class User < ApplicationRecord
  belongs_to :workspace, dependent: :destroy
  validates :user_name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false, scope: [:workspace_id] }
  before_save { self.email = email.downcase }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }
  has_many :channel, through: :channel_user
  has_many :channel_user
end
