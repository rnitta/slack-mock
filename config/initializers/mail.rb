# frozen_string_literal: true
if Rails.env.production?
  # production用のメール設定
elsif Rails.env.development?
  ActionMailer::Base.delivery_method = :letter_opener
else
  ActionMailer::Base.delivery_method = :test
end
