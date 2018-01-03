# frozen_string_literal: true
class WorkspacesController < ApplicationController
  def new
  end
  def check_domain
    workspace = Workspace.all
    if workspace.where(domain: workspace_params[:domain]).count.zero?
      render json: { success: true }
    else
      render json: { success: false, name: workspace.find_by(domain: workspace_params[:domain]).name }
    end
  end
  def create
    email = Email.find_by(token: email_params[:token])
    workspace = Workspace.new(workspace_params)
    if workspace.save
      user = User.new(user_params)
      user.email = email.address
      user.workspace_id = workspace.id
      if user.save
        email.delete
        render json: { success: true }
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end
  def show
  end
  def data
    channel_data_json
  end
  def invite
    if User.exists?(workspace_id: current_user.workspace_id, email: invitation_params[:email])
      render json: { success: false }
    else
      payload = { email: invitation_params[:email],
                  user_id: current_user.id,
                  workspace_id: current_user.workspace_id }
      token = JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
      invitation = Invitation.new(invitation_params)
      invitation.user_id = payload[:user_id]
      invitation.workspace_id = payload[:workspace_id]
      invitation.token = token
      if invitation.save
        InvitationMailer.send_mail(payload[:email], token, current_user.workspace.name).deliver_later
        render json: { success: true }
      end
    end
  end
  def messages
    if params[:type] == 'user'
      type = 1
      speaking_to = User.find_by(workspace_id: current_user.workspace_id, user_name: params[:name])
      messages = Message.where(workspace_id: current_user.workspace_id,
                               receiver_type: type,
                               receiver_id: speaking_to.id,
                               sender_id: current_user.id).or(
                                 Message.where(workspace_id: current_user.workspace_id,
                                               receiver_type: type,
                                               receiver_id: current_user.id,
                                               sender_id: speaking_to.id)
                               ).order(:created_at)
    elsif params[:type] == 'channel'
      type = 2
      channel = Channel.find_by(workspace_id: current_user.workspace_id, name: params[:name])
      messages = Message.where(workspace_id: current_user.workspace_id,
                               receiver_type: type,
                               receiver_id: channel.id).order(:created_at)
    end
    render json: { success: true,
                   messages: messages.select(:id, :sender_id, :receiver_type, :receiver_id, :message, :created_at) }
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name, :domain)
  end
  def user_params
    params.require(:user).permit(:display_name, :user_name, :password, :password_confirmation)
  end
  def email_params
    params.require(:email).permit(:token)
  end
  def invitation_params
    params.require(:invitation).permit(:email)
  end
end
