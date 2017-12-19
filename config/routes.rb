# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  resources :workspaces, only: [:new, :create, :show]
  post '/workspaces/domain/check', to: 'workspaces#check_domain'
  post '/workspaces/data', to: 'workspaces#data'
  post '/workspaces/invite', to: 'workspaces#invite'
  resource :email, only: [:create]
  post '/emails/code/check', to: 'emails#check_code'
  resource :signin, only: [:new, :create]
  resources :channels, only: [:create]
  post '/channels/join', to: 'channels#join'
  post '/channels/star', to: 'channels#star'
  post '/channels/topic', to: 'channels#topic'
  get '/users/invite/:id', to: 'users#invited', constraints: { id: %r([^\/]+) }
  post '/invitations/data', to: 'invitations#data'
end
