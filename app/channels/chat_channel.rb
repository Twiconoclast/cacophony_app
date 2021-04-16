class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'chat_channel'
  end

  def speak(data)
    @message = Message.create(body: data['message'], author_id: data[:author_id], channel_id: data[:channel_id])
    if @message.save
      socket = { message: 'api/messages/show', type: 'message' }
      ChatChannel.broadcast_to('chat_channel', socket)
    end
  end

  def load
    @channel = Channel.find_by(id: (data[:channel_id]).to_i)
    socket = render 'api/messages'
    ChatChannel.broadcast_to('chat_channel', socket)
  end


  def unsubscribed; end
end
