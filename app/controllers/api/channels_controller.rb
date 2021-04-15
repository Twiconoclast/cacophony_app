class Api::ChannelsController < ApplicationController

    def index
        @server = Server.find_by(id: params[:server_id])
        render :index
    end

    def create
        @server = Server.find_by(id: params[:channel][:server_id])
        @channel = Channel.new(channel_params) 
        if @channel.save
            render :show
        else
            render json: {errors: ["Unable to create a channel"]}, status: 422
        end
    end
    
    def show
        @channel = Channel.find_by(id: params[:id])
        @server = Server.find(@channel.server_id)
        if @server
            render :show
        else
            render json: {errors: ["Unable to find this page"]}, status: 422
        end
    end

    def destroy
        @channel = Channel.find_by(id: params[:id])
        @server = Server.find(@channel.server_id)
        if @channel.owner_id == current_user.id || @server.id == current_user.id
            id = @channel.id
            @channel.delete
            render json: {channelId: id}
        else
            render json: {errors: ["You may only delete a channel that you own or from a server that you own"]}, status: 422
        end
    end

    def channel_params
        params.require(:channel).permit(:channel_name, :owner_id, :server_id)
    end

end
