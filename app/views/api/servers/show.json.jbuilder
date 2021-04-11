if @server.private
    json.privateServers do 
        json.set! @server.id do
            json.server_name @server.server_name
            json.id @server.id
            json.private @server.private
            json.members @server.members.each do |member|
                json.extract! member, :id
            end
            json.channels @server.channels.each do |channel|
                json.extract! channel, :id
            end
        end
    end
else
    json.publicServers do
        json.set! @server.id do
            json.server_name @server.server_name
            json.id @server.id
            json.private @server.private
            json.members @server.members.each do |member|
                json.extract! member, :id
            end
            json.channels @server.channels.each do |channel|
                json.extract! channel, :id
            end
        end
    end
end
