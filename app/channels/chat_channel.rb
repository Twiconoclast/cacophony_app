class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for "chat_channel"
  end

  def speak(data)
    @message = Message.create(body: data['message'], author_id: data['author_id'], channel_id: data['channel_id'])
    @channel_id = data['channel_id']
    if @message.save
      num = @message.id  
      socket = {
          message: {
              'id': @message.id,
              'body': @message.body,
              'channelId': @message.channel_id,
              'authorId': @message.author_id,
              'author': @message.author.username,
              'authorImage': @message.author.image_ref,
              'createdAt': @message.created_at
          },
          type: 'message'
      }
      ChatChannel.broadcast_to("chat_channel", socket)
    end
  end

  def load
    @channel = Channel.find_by(id: (data[:channel_id]).to_i)
    socket = {
          message: {
              'id': @message.id,
              'body': @message.body,
              'channelId': @message.channel_id,
              'authorId': @message.author_id,
              'author': @message.author.username,
              'authorImage': @message.author.image_ref,
              'createdAt': @message.created_at
          },
          type: 'message'
      }
    ChatChannel.broadcast_to("chat_channel", socket)
  end


  def unsubscribed 
    # stop_stream_from "chat_channel"
  end
end
