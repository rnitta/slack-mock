# frozen_string_literal: true
class WorkspacesController < ApplicationController
  def check_domain
    workspace = Workspace.all
    if workspace.where(domain: params[:domain]).count.zero?
      render json: { success: true }
    else
      render json: { success: false }
    end
  end
  def create_with_user
    email = EmailConfirmation.find_by(token: params[:token]).address
    workspace = Workspace.new
    workspace.name = params[:workspace_name]
    workspace.domain = params[:domain]
    if workspace.save
      user = User.new
      user.email = email
      user.display_name = params[:display_name]
      user.user_name = params[:user_name]
      user.password = params[:password]
      user.password_confirmation = params[:password]
      user.workspace_id = workspace.id
      if user.save
        EmailConfirmation.find_by(token: params[:token]).delete
        render json: { success: true }
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end
end
