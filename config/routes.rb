Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'urls#index'
  get '/urls/index/:tag_id' => 'urls#index'
  resources :urls do
    collection do
      get 'search'
      get 'searchResult'
    end
  end
  resources :tags do
      collection do
        get 'search'
      end
  end
  resources :users, only: [:edit, :update]
end
