# frozen_string_literal: true
class WorkspacesController < ApplicationController
  def check_domain
    workspace = Workspace.all
    if workspace.where(domain: workspace_params[:domain]).count.zero?
      render json: { success: true }
    else
      render json: { success: false }
    end
  end
  def create_with_user
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
end
