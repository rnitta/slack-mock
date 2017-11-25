# frozen_string_literal: true
class Workspace < ApplicationRecord
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_DOMAIN_REGEX = /\A[a-zA-Z0-9]+\z/
  validates :domain, presence: true, length: { maximum: 21 },
                     format: { with: VALID_DOMAIN_REGEX },
                     uniqueness: { case_sensitive: false }
  before_save { self.domain = domain.downcase }
end
