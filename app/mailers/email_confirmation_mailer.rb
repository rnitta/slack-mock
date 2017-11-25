# frozen_string_literal: true
class EmailConfirmationMailer < ApplicationMailer
  default from: 'address@example.com'

  def send_confirm(record)
    @record = record
    mail(
      subject: "確認コードは#{@record.code}です",
      to: @record.address
    )
  end
end
