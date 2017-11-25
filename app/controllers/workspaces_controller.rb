# frozen_string_literal: true
class WorkspacesController < ApplicationController
  def check_domain
    workspace = Workspace.all
    if workspace.where(domain: params[:domain]).count.zero?
      render json: { success: true }
    else
      render json: { success: false }
    end
  end
end
