# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  get '/workspaces', to: 'workspaces#new'
  post '/workspaces', to: 'workspaces#create_with_user'
  post '/workspaces/domain/check', to: 'workspaces#check_domain'
  post '/emails', to: 'email_verification#new'
  post '/emails/code/check', to: 'email_verification#check_code'
end
