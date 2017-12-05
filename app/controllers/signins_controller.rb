# frozen_string_literal: true
class SigninsController < ApplicationController
  def new
  end
  def create
    workspace = Workspace.find_by(domain: signin_params[:domain])
    user = User.where(workspace_id: workspace.id).find_by(email: signin_params[:email])
    if user&.authenticate(signin_params[:password])
      payload = { email: signin_params[:email],
                  workspace_id: workspace.id,
                  workspace_name: workspace.name,
                  domain: workspace.domain }
      token = JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
      if user.update_attribute(:token, token)
        render json: { success: true, token: token }
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end

  private

  def signin_params
    params.require(:signin).permit(:domain, :email, :password)
  end
end
