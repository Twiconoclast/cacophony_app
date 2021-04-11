class Api::ServersController < ApplicationController
    def index
        @user = User.find_by(id: current_user.id)
        render :index
    end

    def create
        @user = User.find_by(id: params[:owner_id])
        @server = Server.new(server_params)
        if @server.save
            @channel = Channel.new(channel_name: 'general', owner_id: @server.owner_id, server_id: @server.id)
            @channel.save
            @server_membership = ServerMembership.new(server_id: @server.id, member_id: @server.owner_id)
            @server_membership.save
            render :show
        else
            render json: {errors: ["You already have a server by that name"]}, status: 422
        end
    end

    def show
        @server = Server.find_by(id: params[:id])
        render :show
    end

    def destroy
        @user = User.find_by(id: params[:user_id])
        @server = Server.find_by(id: params[:id])
        if @server.owner_id == @user.id
            delete @server
            render json: {}
        else
            render json: {errors: ["You may only delete your own server"]}, status: 422
        end
    end

    def server_params
        params.require(:server).permit(:server_name, :owner_id, :private)
    end

end
