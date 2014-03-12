Sellout::Application.routes.draw do
  authenticated :user do
    root :to => "event#new"
  end
  root :to => "home#index"

  get "/venues" => "home#venues"
  get "/calendar" => "home#calendar"
  
  devise_for :users
  resources :users

  resources :events
  resources :artists
end