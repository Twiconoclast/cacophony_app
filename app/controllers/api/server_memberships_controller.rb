class Api::ServerMembershipsController < ApplicationController
    def create
        @server = Server.find(params[:server_membership][:server_id])
        @server_membership = ServerMembership.new(server_membership_params)
        if @server_membership.save
            render :show
        else
            render json: {errors: ["Something went wrong"]}, status: 422
        end
    end

    def destroy
        @user = User.find_by(id: params[:member_id])
        @server_membership = @user.server_membership.where(server_id: params[:server_id])
        if @server_membership
            member_id = @server_membership.member_id
            server_id = @server_membership.server_id
            delete @server_membership
            render json: {server_membership: {server_id: server_id, member_id: member_id}}
        else
            render json: {errors: ["Something went wrong"]}, status: 422
        end
    end

    def server_membership_params
        params.require(:server_membership).permit(:server_id, :member_id)
    end
end
