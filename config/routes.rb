# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  get '/new_workspace', to: 'react#new_workspace'
  post '/api/new_email', to: 'email_confirmations#new'
  post '/api/check_code', to: 'email_confirmations#check_code'
  post '/api/check_domain', to: 'workspaces#check_domain'
  post '/api/create_workspace', to: 'workspaces#create_with_user'
end
