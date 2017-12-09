# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  resources :workspaces, only: [:new, :create, :show]
  post '/workspaces/domain/check', to: 'workspaces#check_domain'
  post '/workspaces/data', to: 'workspaces#data'
  resource :email, only: [:create]
  post '/emails/code/check', to: 'emails#check_code'
  resource :signin, only: [:new, :create]
  resources :channels, only: [:create]
end
