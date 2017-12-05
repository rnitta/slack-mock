# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  resources :workspaces, only: [:new, :create]
  post '/workspaces/domain/check', to: 'workspaces#check_domain'
  post '/emails', to: 'email_verification#new'
  post '/emails/code/check', to: 'email_verification#check_code'
  get '/signin', to: 'signin#new'
  post '/signin', to: 'signin#issue_jwt'
end
