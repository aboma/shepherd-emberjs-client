ShepherdEmberjsClient::Application.routes.draw do
  root :to => "application#index"
  resources :sessions, :only => [:create, :destroy, :new]
  get "login" => "sessions#new", :as => "login"
  get "logout" => "sessions#destroy", :as => "logout"
end
