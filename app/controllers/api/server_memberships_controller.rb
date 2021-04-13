class Api::ServerMembershipsController < ApplicationController
    def create
        @server_membership = ServerMembership.new(server_membership_params)
        if @server_membership.save
            render json: {success: ["Member added"]}, status: 200
        else
            render json: {errors: ["Something went wrong"]}, status: 422
        end
    end

    def destroy
        @user = User.find_by(id: params[:member_id])
        @server_membership = @user.server_membership.where(server_id: params[:server_id])
        if @server_membership
            delete @server_membership
            render json: {success: ["Membership Removed"]}, status: 200
        else
            render json: {errors: ["Something went wrong"]}, status: 422
        end
    end

    def server_membership_params
        params.require(:server_membership).permit(:server_id, :member_id)
    end
end
