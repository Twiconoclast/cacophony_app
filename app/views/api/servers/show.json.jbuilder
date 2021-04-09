json.set! @server.id do
    json.server_name @server.server_name
    json.members @server.members.each do |member|
        json.set! member.id json.extract! member, :id, :username
    end
    json.channels @server.channels.each do |channel|
        json.set! channel.id json.extract! channel, :id, channel_name
    end
end