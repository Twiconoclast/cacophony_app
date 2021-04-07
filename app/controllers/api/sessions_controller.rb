class Api::SessionsController < ApplicationController
    before_action :require_logged_in, only: [:destroy]

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            log_in_user!(@user)
		    render "api/users/show"
        else
            render json: {errors: ["Invalid Credentials"]}, status: 422
        end
    end
 
    def destroy
        log_out!
        render json: {}
    end

end
