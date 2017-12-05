# frozen_string_literal: true
class EmailsController < ApplicationController
  def create
    # 同じメールアドレスの既存のレコードを削除
    Email.where(address: params[:email]).delete_all
    # メールアドレス確認用
    email = Email.new
    email.address = params[:email]
    email.code = (rand(900_000) + 100_000).to_s
    email.token = SecureRandom.uuid
    if email.save
      # コードメール送信
      VerificationCodeMailer.send_mail(email).deliver_later
      # JSONを返す
      render json: { success: true }
    end
  end

  def check_code
    email = Email.find_by(address: params[:email].downcase)
    if params[:code] == email[:code]
      render json: { success: true, token: email[:token] }
    else
      render json: { success: false }
    end
  end
end
