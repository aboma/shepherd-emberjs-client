VilioEmberjsClient::Application.routes.draw do
  root :to => "application#index"
  resources :sessions, :only => [:create, :destroy, :new]
end
