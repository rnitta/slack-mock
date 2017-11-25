# frozen_string_literal: true
class EmailConfirmationsController < ApplicationController
  def new
    # 同じメールアドレスの既存のレコードを削除
    EmailConfirmation.where(address: params[:email]).delete_all
    # メールアドレス確認用
    emailconfirmation = EmailConfirmation.new
    emailconfirmation.address = params[:email]
    emailconfirmation.code = (rand(900_000) + 100_000).to_s
    emailconfirmation.token = SecureRandom.uuid
    if emailconfirmation.save
      # コードメール送信
      EmailConfirmationMailer.send_confirm(emailconfirmation).deliver_later
      # JSONを返す
      render json: { success: true }
    end
  end

  def check_code
    emailconfirmation = EmailConfirmation.find_by(address: params[:email].downcase)
    p emailconfirmation
    if params[:code] == emailconfirmation[:code]
      render json: { success: true, token: emailconfirmation[:token] }
    else
      render json: { success: false }
    end
  end
end
