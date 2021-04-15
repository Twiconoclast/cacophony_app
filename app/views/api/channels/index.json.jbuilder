@server.channels.each do |channel|
    if @server.private
        json.set! channel.id do
            json.channel_name @server.server_name
            json.id channel.id
            json.server_id channel.server_id
            json.owner_id channel.owner_id
            json.private 'private'
            json.messages channel.messages.each do |message|
                json.extract! message, :id, :author_id, :channel_id, :body
            end
        end
    else
        json.set! channel.id do
            json.channel_name channel.channel_name
            json.id channel.id
            json.server_id channel.server_id
            json.owner_id channel.owner_id
            json.private 'public'
            json.messages channel.messages.each do |message|
                json.extract! message, :id, :author_id, :channel_id, :body
            end
        end
    end
end