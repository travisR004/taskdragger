Trellino::Application.routes.draw do

  namespace :api, defaults: {format: :json} do

    resources :boards, only: [:index, :show, :create, :update, :destroy] do
      resources :lists, only: [:index, :show, :create, :update, :destroy]
    end

    resources :cards, only: [:create, :update, :destroy, :index] do
        resources :todo_items, only: [:create, :update, :destroy]
      end

    resources :card_assignments, only: :destroy
  end

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
  get "demo", to: "users#demo"
  root to: 'static_pages#root'
end
