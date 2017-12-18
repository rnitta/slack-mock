# frozen_string_literal: true
class InvitationMailer < ApplicationMailer
  default from: 'address@example.com'

  def send_mail(email, token, workspace_name)
    @token = token
    mail(
      subject: "SlackMockチーム#{workspace_name}に招待",
      to: email
    )
  end
end
