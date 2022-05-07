Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :organizations, only: %i[index show create update]

  devise_for :users, module: 'users', only: %i[sessions passwords registrations confirmations], skip_helpers: true, defaults: { format: :json }

  get 'profile', to: 'users#profile'
  resources :users, only: %i[index show create update]
end
