export const fetchMessages = (channel_id) => (
    $.ajax({
        method: 'get',
        url: `/api/messages/`,
        data: {channel_id}
    }) 
) 

export const fetchMessage = (messageId) => (
    $.ajax({
        method: 'get',
        url: `/api/messages/${messageId}`,
    })
)

export const createMessage = (message) => (
    $.ajax({
        method: 'post',
        url: `/api/messages/`,
        data: {message}
    })
)

export const updateMessage = (message) => (
    $.ajax({
        method: 'patch',
        url: `/api/messages/${message.id}`,
        data: {message}
    })
)

export const deleteMessage = (messageId) => (
    $.ajax({
        method: 'delete',
        url: `/api/messages/${messageId}`
    })
)