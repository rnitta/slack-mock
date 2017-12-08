# frozen_string_literal: true
class WorkspacesController < ApplicationController
  def new
  end
  def check_domain
    workspace = Workspace.all
    if workspace.where(domain: workspace_params[:domain]).count.zero?
      render json: { success: true }
    else
      render json: { success: false, name: workspace.find_by(domain: workspace_params[:domain]).name }
    end
  end
  def create
    email = Email.find_by(token: email_params[:token])
    workspace = Workspace.new(workspace_params)
    if workspace.save
      user = User.new(user_params)
      user.email = email.address
      user.workspace_id = workspace.id
      if user.save
        email.delete
        render json: { success: true }
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end
  def show
  end
  def data
    render json: { success: true }
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name, :domain)
  end
  def user_params
    params.require(:user).permit(:display_name, :user_name, :password, :password_confirmation)
  end
  def email_params
    params.require(:email).permit(:token)
  end
  def current_user
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    email = decoded_token[0]['email']
    workspace_id = decoded_token[0]['workspace_id']
    User.find_by(workspace_id: workspace_id, email: email)
  end
end
