# frozen_string_literal: true
class EmailConfirmationsController < ApplicationController
  def new
    # 同じメールアドレスの既存のレコードを削除
    EmailConfirmation.where(address: email_params).delete_all
    # メールアドレス確認用
    emailconfirmation = EmailConfirmation.new
    emailconfirmation[:address] = email_params
    emailconfirmation[:code] = (rand(900_000) + 100_000).to_s
    emailconfirmation[:token] = SecureRandom.uuid
    p emailconfirmation
    if emailconfirmation.save
      # コードメール送信
      EmailConfirmationMailer.send_confirm(emailconfirmation).deliver_later
      # JSONを返す
      render json: { success: true }
    end
  end

  def check_code
    emailconfirmation = EmailConfirmation.find_by(address: email_params.downcase)
    p emailconfirmation
    if code_params == emailconfirmation[:code]
      render json: { success: true, token: emailconfirmation[:token] }
    else
      render json: { success: false }
    end
  end

  private

  def email_params
    params.require(:email)
  end
  def code_params
    params.require(:code)
  end
end
