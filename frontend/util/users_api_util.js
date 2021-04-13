export const fetchUserByUsername = (username) => (
    $.ajax({
        method: 'get',
        url: '/api/search',
        data: {username}
    })
)

export const fetchUser = (id) => (
    $.ajax({
        method: 'get',
        url: `/api/users/${id}`
    })
)


