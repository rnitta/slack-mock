# frozen_string_literal: true
class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_user.token
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def broadcast_message(data)
    message = Message.new
    message.sender_id = current_user.id
    message.message = data['message']
    message.workspace_id = current_user.workspace_id
    if data['type'] == 'user'
      message.receiver_type = 1
      receiver = User.find_by(workspace_id: current_user.workspace_id, user_name: data['to'])
      message.receiver_id = receiver.id
      cast_to_user(current_user, receiver, message) if message.save!
    elsif data['type'] == 'channel'
      message.receiver_type = 2
      receiver = Channel.find_by(workspace_id: current_user.workspace_id, name: data['to'])
      message.receiver_id = receiver.id
      if message.save
        receiver.channel_users.each do |channel_user|
          cast_to_channel(current_user, receiver, message, channel_user.user.token)
        end
      end
    end
  end

  def cast_to_user(sender, receiver, message)
    ActionCable.server.broadcast(
      receiver.token,
      id: message.id,
      sender_id: sender.id,
      receiver_type: message.receiver_type,
      receiver_id: receiver.id,
      message: message.message,
      created_at: message.created_at.strftime('%Y年 %m月 %d日 %H:%M:%S')
    )
  end
  def cast_to_channel(sender, receiver, message, token)
    ActionCable.server.broadcast(
      token,
      id: message.id,
      sender_id: sender.id,
      receiver_type: message.receiver_type,
      receiver_id: receiver.id,
      message: message.message,
      created_at: message.created_at.strftime('%Y年 %m月 %d日 %H:%M:%S')
    )
  end
end
