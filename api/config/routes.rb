Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  devise_for :users, module: 'users', only: %i[sessions passwords registrations confirmations], skip_helpers: true, defaults: { format: :json }

  resources :organizations, only: %i[index show create update]
  resources :users, only: %i[index show create update]
  get 'profile', to: 'users#profile'
  resources :questions, only: %i[index show create update]
  resources :interviews, only: %i[index show create update]
end
