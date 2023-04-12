Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  devise_for :users, module: :users, only: %i[sessions passwords registrations confirmations], skip_helpers: true, defaults: { format: :json }
  post :guest_sign_in, to: 'users/guest_sessions#create'

  resources :organizations, only: %i[index show create update] do
    member { get :overview }
  end
  resources :users, only: %i[index show create update]
  get :profile, to: 'users#profile'
  resources :questions, only: %i[index show create update]
  resources :interviews, only: %i[index show create update] do
    get :note, to: 'notes#interview_note'
    get :ping, on: :member
  end
  resources :notes, only: %i[index show create update]
end
