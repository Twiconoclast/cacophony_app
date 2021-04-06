json.set! @user.id do
    json.username @user.username
    json.servers @user.servers.each do |server|
        json.set! server.id json.extract! server, :id, :server_name
    end
end