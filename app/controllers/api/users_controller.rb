class Api::UsersController < ApplicationController
    before_action :require_logged_in, only: [:show, :destroy]
    image_references = ['blueballoonav', 'blueguyav', 'frogav', 'mayberabbitav', 'mushroomav', 'wizardav']

    def search
        @users = User.ransack(username_cont: params[:username]).result(distinct: true)
    end
 
    def create
        @user = User.new(user_params)
        if @user.save
            @user.image_ref = ['blueballoonav', 'blueguyav', 'frogav', 'mayberabbitav', 'mushroomav', 'wizardav'].sample(1)[0]
            @user.save
            log_in_user!(@user)
            render :show
        else
            render json: {errors: @user.errors.full_messages }, status: 422
        end
    end
 
    def show
        @user = User.find_by(id: params[:id])
        render :show
    end
 
 
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
