@channel.messages.each do |message|
    json.set! message.id do
        json.id message.id
        json.body message.body
        json.channel_id message.channel_id
        json.author_id message.author_id
        json.author message.author.username
        json.created_at message.created_at
    end
end