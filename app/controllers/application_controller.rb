class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  helper_method :current_user

  def current_user
    session_token = session[:session_token]
    return nil if session_token.nil?

    User.find_by_session_token(session_token)
  end
  
  def login!
    @user.reset_session_token!
    session[:session_token] = @user.session_token
  end

end
