# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def channel_data_json
    @channels = Channel.where(workspace_id: current_user.workspace_id, public: true).pluck(:name)
    @joined_channels = current_user.channels.pluck(:name)
    @available_channels = @channels - @joined_channels
    render 'workspaces/data', formats: 'json', handlers: 'jbuilder'
  end
  def current_user
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    email = decoded_token[0]['email']
    workspace_id = decoded_token[0]['workspace_id']
    User.find_by(workspace_id: workspace_id, email: email)
  end
end
