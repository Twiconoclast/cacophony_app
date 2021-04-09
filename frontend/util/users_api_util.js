export const fetchUserByUsername = (username) => (
    $.ajax({
        method: 'get',
        url: '/api/search',
        data: {username}
    })
)

export const fetchUser = (userId) => (
    $.ajax({
        method: 'get',
        url: `/api/users/${userId}`,
    })
)


