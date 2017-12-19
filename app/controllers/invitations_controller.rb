# frozen_string_literal: true
class InvitationsController < ApplicationController
  def data
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    email = decoded_token[0]['email']
    workspace_id = decoded_token[0]['workspace_id']
    user_id = decoded_token[0]['user_id']
    workspace = Workspace.find(workspace_id)
    user = User.find(user_id)
    render json: { success: true,
                   email: email,
                   workspace_name: workspace.name,
                   domain: workspace.domain,
                   invitor: user.display_name }
  end
end
