# frozen_string_literal: true
class InvitationsController < ApplicationController
  def data
    workspace = Workspace.find(decoded_token.workspace_id)
    user = User.find(decoded_token.user_id)
    render json: { success: true,
                   email: decoded_token.email,
                   workspace_name: workspace.name,
                   domain: workspace.domain,
                   invitor: user.display_name }
  end

  private

  def decoded_token
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    dot_hash = ActiveSupport::OrderedOptions.new
    dot_hash.email = decoded_token[0]['email']
    dot_hash.workspace_id = decoded_token[0]['workspace_id']
    dot_hash.user_id = decoded_token[0]['user_id']
    dot_hash
  end
end
