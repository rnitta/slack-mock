# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def channel_data_json
    @channels = Channel.where(workspace_id: current_user.workspace_id, public: true).pluck(:name)
    @joined_channels = current_user.channels.pluck(:name)
    @available_channels = @channels - @joined_channels
    render 'workspaces/data', formats: 'json', handlers: 'jbuilder'
  end
end
