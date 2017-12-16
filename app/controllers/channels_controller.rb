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
      channel_data_json
    end
  end
  def join
    channel = Channel.find_by(name: channel_params[:name])
    if ChannelUser.exists?(channel_id: channel.id, user_id: current_user.id)
      render json: { success: false }
    else
      ChannelUser.create(channel_id: channel.id, user_id: current_user.id)
      channel.update_attribute(:count, channel.count + 1)
      channel_data_json
    end
  end
  def star
    channel = Channel.find_by(name: channel_params[:name])
    ChannelUser.find_by(channel_id: channel.id, user_id: current_user.id)
               .update_attribute(:starred, params[:star] ? true : false)
    channel_data_json
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :topic, :public)
  end
end
