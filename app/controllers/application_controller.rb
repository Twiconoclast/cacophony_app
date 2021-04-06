class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :log_in_user!, :require_logged_in, :log_out!
 
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end
 
    def require_logged_in
        render json: {errors: ["You must be logged in to do that"]}, status: 404 unless logged_in?
    end
 
    def logged_in?
        !!current_user
    end
 
    def log_out!
        current_user.reset_session_token! if logged_in?
        session[:session_token] = nil
        @current_user = nil
    end
 
    def log_in_user!(user)
        session[:session_token] = user.reset_session_token!
    end
end
