Sellout::Application.routes.draw do
  authenticated :user do
    root :to => "events#new"
  end
  root :to => "home#index"

  get "/venues" => "home#venues"
  
  devise_for :users
  resources :users

  resources :events
  resources :artists
end