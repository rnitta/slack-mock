# frozen_string_literal: true
class ChannelsController < ApplicationController
  def create
    p current_user
    p channel_params
    render json: { success: true }
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
