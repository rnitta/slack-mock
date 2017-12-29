# frozen_string_literal: true
class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_user.token
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def broadcast_message(data)
    p data
  end
end
