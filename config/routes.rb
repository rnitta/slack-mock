# frozen_string_literal: true
Rails.application.routes.draw do
  root 'react#index'
  get '/new_workspace', to: 'react#new_workspace'
  post '/api/email_confirmation', to: 'email_confirmations#new'
end
