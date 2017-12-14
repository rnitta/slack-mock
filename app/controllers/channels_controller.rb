# frozen_string_literal: true
class ChannelsController < ApplicationController
  def create
    if Channel.exists?(workspace_id: current_user.workspace_id, name: channel_params[:name])
      render json: { success: false }
    else
      channel = Channel.new(channel_params)
      channel.workspace_id = current_user.workspace_id
      channel.count = 1
      channel.save!
      ChannelUser.create(channel_id: channel.id, user_id: current_user.id)
      render json: { success: true }
    end
  end
  def join
    channel = Channel.find_by(name: channel_params[:name])
    if ChannelUser.exists?(channel_id: channel.id, user_id: current_user.id)
      render json: { success: false }
    else
      ChannelUser.create(channel_id: channel.id, user_id: current_user.id)
      channel_data_json
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :topic, :public)
  end
  def current_user
    decoded_token = JWT.decode(params[:jwt], Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    email = decoded_token[0]['email']
    workspace_id = decoded_token[0]['workspace_id']
    User.find_by(workspace_id: workspace_id, email: email)
  end
end
