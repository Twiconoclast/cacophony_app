class Api::MessagesController < ApplicationController

    def index
        @channel = Channel.find_by(id: params[:channel_id])
        render :index
    end

    def create
        @channel = Channel.find_by(id: params[:message][:channel_id])
        @message = Message.new(message_params)
        if @message.save
            render :show
        else
            render json: {errors: ["Unable to save this message"]}, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        else
            render json: {errors: ["Unable to edit this message"]}, status: 422
        end
    end

    def show
        @message = Message.find_by(id: params[:id])
        render :show
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        if @message.author_id == current_user.id 
            id = @message.id
            @message.delete
            render json: {messageId: id}
        else
            render json: {errors: ["You may only delete your own message"]}, status: 422
        end
    end

    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end

end
