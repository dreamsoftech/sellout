Sellout::Application.routes.draw do
  mount Blogit::Engine => "/blog"

  get "/about"  => "home#about"
  get "/contact"  => "home#contact"
  get "/faq"  => "home#faq"
  get "/terms"  => "home#terms"

  authenticated :user do
    root :to => "events#index"
  end
  root :to => "home#index"

  get "/venues" => "home#venues"

  devise_for :users
  resources :users

  resources :events
  resources :artists
  resources :posters
end