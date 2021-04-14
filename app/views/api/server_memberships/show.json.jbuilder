if @server.private
    json.privateServers do 
        json.set! @server.id do
            json.server_name @server.server_name
            json.id @server.id
            json.owner_id @server.owner_id
            json.private @server.private
            json.default_channel_id @server.default_channel_id
            json.recipient_id @server.recipient_id
            json.members @server.members.each do |member|
                json.extract! member, :id, :username
            end
            json.channels @server.channels.each do |channel|
                json.extract! channel, :id, :channel_name
            end
        end
    end
else
    json.publicServers do
        json.set! @server.id do
            json.server_name @server.server_name
            json.id @server.id
            json.owner_id @server.owner_id
            json.private @server.private
            json.default_channel_id @server.default_channel_id
            json.members @server.members.each do |member|
                json.extract! member, :id, :username
            end
            json.channels @server.channels.each do |channel|
                json.extract! channel, :id, :channel_name
            end
        end
    end
end
