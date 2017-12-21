# frozen_string_literal: true
class UsersController < ApplicationController
  def invited
    redirect_to root_path unless Invitation.exists?(token: params[:id])
  end
  def create_with_invitation
    user = User.new(user_params)
    user.email = decoded_token.email
    user.workspace_id = decoded_token.workspace_id
    user.invited_by = decoded_token.user_id
    workspace = Workspace.find(user.workspace_id)
    payload = { email: user.email,
                workspace_id: user.workspace_id,
                workspace_name: workspace.name,
                domain: workspace.domain }
    token = JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
    user.token = token
    if user.save
      Invitation.find_by(token: params[:jwt]).delete
      render json: { success: true, token: token }
    else
      render json: { success: false }
    end
  end

  private

  def user_params
    params.require(:user).permit(:display_name, :user_name, :password, :password_confirmation)
  end
  def decoded_token
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    dot_hash = ActiveSupport::OrderedOptions.new
    dot_hash.email = decoded_token[0]['email']
    dot_hash.workspace_id = decoded_token[0]['workspace_id']
    dot_hash.user_id = decoded_token[0]['user_id']
    dot_hash
  end
end
