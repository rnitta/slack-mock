# frozen_string_literal: true
class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_of_#{current_user.workspace.domain}"
    current_user.update_attribute(:status, 1)
    broadcast_appearance
  end

  def unsubscribed
    current_user.update_attribute(:status, 0)
    broadcast_appearance
  end

  def activate_user
    # 複数タブで開いてる場合に１つタブが閉じられた場合の対策
    # current_user.update_attribute(:status, 1)がなぜか動かないので↓
    User.find(current_user.id).update_attribute(:status, 1)
    broadcast_appearance
  end

  private

  def broadcast_appearance
    ActionCable.server.broadcast(
      "appearance_of_#{current_user.workspace.domain}",
      users: User.where(workspace_id: current_user.workspace_id).select('display_name', 'user_name', 'status').as_json
    )
  end
end
