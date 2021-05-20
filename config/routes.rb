Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: 'json' } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:show, :create]
    get :search, controller: :users
    resources :servers, only: [:index, :show, :create, :destroy]
    resource :server_memberships, only: [:create, :destroy]
    resources :channels, only: [:index, :show, :create, :destroy]
    resources :messages, only: [:index, :show, :create, :update, :destroy]
  end

  root to: 'static_pages#root'
  mount ActionCable.server, at: '/cable'
end
