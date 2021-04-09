json.set! @user.id do
    json.username @user.username
    json.servers @user.servers.each do |server|
        json.set! server.id json.extract! server, :id, :server_name
    end
    json.fellow_server_members @user.fellow_server_members.each do |member|
        json.set! member.id json.extract! member, :id, :username
    end
end