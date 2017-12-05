# frozen_string_literal: true
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_token_user
    end

    protected

    def find_token_user
      token = request.params[:token]
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      email = decoded_token[0]['email']
      workspace_id = decoded_token[0]['workspace_id']
      if current_user = User.find_by(workspace_id: workspace_id, email: email)
        current_user
      else
        reject_unauthorized_connection
      end
    rescue StandardError
      reject_unauthorized_connection
    end
  end
end
