export const createUser = (user) => (
    $.ajax({
        method: 'post',
        url: '/api/users',
        data: {user}
    })
)

export const createSession = (user) => (
    $.ajax({
        method: 'post',
        url: '/api/session',
        data: {user}
    })
)

export const deleteSession = () => (
    $.ajax({
        method: 'delete',
        url: '/api/session',
    })
)