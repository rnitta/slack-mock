# frozen_string_literal: true
class EmailVerificationMailer < ApplicationMailer
  default from: 'address@example.com'

  def send_mail(record)
    @record = record
    mail(
      subject: "確認コードは#{@record.code}です",
      to: @record.address
    )
  end
end
