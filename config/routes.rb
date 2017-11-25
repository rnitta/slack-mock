# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  get '/new_workspace', to: 'react#new_workspace'
  post '/api/new_email', to: 'email_confirmations#new'
  post '/api/check_code', to: 'email_confirmations#check_code'
end
