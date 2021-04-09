@users.servers.each do |server|
    json.set! server.id do 
        json.extract! server, :id, :server_name
    end
end