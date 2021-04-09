json.set! @user.id do
    json.id @user.id
    json.username @user.username
    json.servers(@user.servers) do |server|
        json.extract! server, :id, :server_name
    end
    json.fellow_server_members(@user.fellow_server_members) do |member|
        json.extract! member, :id, :username
    end
end