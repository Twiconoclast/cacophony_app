export const fetchChannels = (server_id) => (
    $.ajax({
        method: 'get',
        url: `/api/channels/`,
        data: {server_id}
    }) 
) 

export const fetchChannel = (channelId) => (
    $.ajax({
        method: 'get',
        url: `/api/channels/${channelId}`,
    })
)

export const createChannel = (channel) => (
    $.ajax({
        method: 'post',
        url: `/api/channels/`,
        data: {channel}
    })
)

export const deleteChannel = (channelId) => (
    $.ajax({
        method: 'delete',
        url: `/api/channels/${channelId}`
    })
)