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
            @channel.save!
            @server.update!(default_channel_id: @channel.id)
            @server_membership = ServerMembership.new(server_id: @server.id, member_id: @server.owner_id)
            if @server.recipient_id
                @recipient_membership = ServerMembership.new(server_id: @server.id, member_id: @server.recipient_id)
                @recipient_membership.save!
            end
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
        @user = current_user
        @server = Server.find_by(id: params[:id])
        id = params[:id]
        if @server.owner_id == @user.id
            if @server.private
                @server.delete
                render json: {private_servers: {id: id}}
            else 
                @server.delete
                render json: {public_servers: {id: id}}
            end
        else
            render json: {errors: ["You may only delete your own server"]}, status: 422
        end
    end

    def server_params
        params.require(:server).permit(:server_name, :owner_id, :private, :recipient_id, :default_channel_id)
    end

end
