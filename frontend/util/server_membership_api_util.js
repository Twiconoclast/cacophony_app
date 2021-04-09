export const createServerMembership = (server_membership) => (
    $.ajax({
        method: 'post',
        url: `/api/server_memberships/`,
        data: {server_membership}
    })
)

export const deleteServerMembership = (member_id, server_id) => (
    $.ajax({
        method: 'delete',
        url: `/api/server_memberships/`,
        data: {member_id, server_id}
    })
)