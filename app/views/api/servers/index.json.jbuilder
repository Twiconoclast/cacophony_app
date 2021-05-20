@user.servers.each do |server|
    if server.private
        json.privateServers do 
            json.set! server.id do 
                json.extract! server, :server_name, :id, :owner_id, :private, :default_channel_id, :recipient_id
                json.members server.members.each do |member|
                    json.extract! member, :id, :username, :image_ref
                end
                json.channels server.channels.each do |channel|
                    json.extract! channel, :id, :channel_name
                end
            end
        end
    else
        json.publicServers do 
            json.set! server.id do 
                json.extract! server, :server_name, :id, :owner_id, :private, :default_channel_id
                json.members server.members.each do |member|
                    json.extract! member, :id, :username, :image_ref
                end
                json.channels server.channels.each do |channel|
                    json.extract! channel, :id, :channel_name
                end
            end
        end
    end
end