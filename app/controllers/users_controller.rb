class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      login!
      redirect_to root_url
    else
      render json: { errors: @user.errors.full_messages }
    end
  end
  
  def demo
    password = BCrypt::Password.create("random_password")
    email = "user" + (User.all.length + 1).to_s
    @user = User.create(email: email, password:  password)
    login!
    @board = current_user.boards.create(title: "Demo Board")
    @list1 = List.create(title: "You can sort lists by dragging and dropping", rank: 1, board_id: @board.id)
    @list2 = List.create(title: "Cards can be sorted the same way!", rank: 2, board_id: @board.id)
    @list3 = List.create(title: "Remove cards and lists when tasks are finished!", rank: 3, board_id: @board.id)
    @card1 = Card.create(rank: 1, list_id: @list1.id, title: "Move cards to other lists", description: "Thanks for demoing")
    @card2 = Card.create(rank: 2, list_id: @list1.id, title: "Drag to another list!", description: "Sign Up to create your own boards!")
    @card3 = Card.create(rank: 3, list_id: @list1.id, title: "card 3", description: "Welcome to Task Dragger")
    @card4 = Card.create(rank: 4, list_id: @list2.id, title: "card 4", description: "Thanks for demoing")
    @card5 = Card.create(rank: 5, list_id: @list2.id, title: "card 5", description: "Thanks for demoing")
    @card6 = Card.create(rank: 6, list_id: @list2.id, title: "card 6", description: "Thanks for demoing")
    @card7 = Card.create(rank: 7, list_id: @list3.id, title: "card 7", description: "Thanks for demoing")
    @card8 = Card.create(rank: 8, list_id: @list3.id, title: "card 8", description: "Thanks for demoing")
    redirect_to :root
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
