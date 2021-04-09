export const fetchServers = (user_id) => (
    $.ajax({
        method: 'get',
        url: `/api/servers/`,
        data: {user_id}
    })
)

export const fetchServer = (serverId) => (
    $.ajax({
        method: 'get',
        url: `/api/servers/${serverId}`
    })
)

export const createServer = (server) => (
    $.ajax({
        method: 'post',
        url: `/api/servers/`,
        data: {server}
    })
)

export const deleteServer = (serverId) => (
    $.ajax({
        method: 'delete',
        url: `/api/servers/${serverId}`
    })
)