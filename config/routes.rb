# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  get '/workspaces', to: 'react#new_workspace'
  post '/workspaces', to: 'workspaces#create_with_user'
  post '/workspaces/check_domain', to: 'workspaces#check_domain'
  post '/emails', to: 'email_verification#new'
  post '/emails/check_code', to: 'email_verification#check_code'
end
