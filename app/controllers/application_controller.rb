# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def channel_data_json
    @current_user = current_user
    @workspace_name = current_user.workspace.name
    @channels = Channel.where(workspace_id: current_user.workspace_id, public: true).select('id', 'name', 'topic', 'count')
    @joined_channels = current_user.channels.select('id', 'name', 'topic', 'count')
    @available_channels = @channels.pluck(:name) - @joined_channels.pluck(:name)
    @starred_channels = []
    @users = User.where(workspace_id: current_user.workspace_id).select('id', 'display_name', 'user_name', 'status')
    channelusers = ChannelUser.where(user_id: current_user.id, starred: true)
    channelusers.each do |channeluser|
      @starred_channels.push(channeluser.channel.name)
    end
    render 'workspaces/data', formats: 'json', handlers: 'jbuilder'
  end
  def current_user
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    email = decoded_token[0]['email']
    workspace_id = decoded_token[0]['workspace_id']
    User.find_by(workspace_id: workspace_id, email: email)
  end
end
