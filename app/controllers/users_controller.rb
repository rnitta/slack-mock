# frozen_string_literal: true
class UsersController < ApplicationController
  def invited
    redirect_to root_path unless Invitation.exists?(token: params[:id])
  end
end
