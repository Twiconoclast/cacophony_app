export const RECEIVE_SERVER_MEMBERSHIP = 'RECEIVE_SERVER_MEMBERSHIP'
export const REMOVE_SERVER_MEMBERSHIP = 'REMOVE_SERVER_MEMBERSHIP'
import * as ServerMembershipAPIUtils from '../util/server_membership_api_util'

const receiveServerMembership = (server) => ({
    type: RECEIVE_SERVER_MEMBERSHIP,
    server
})

const removeServerMembership = (member_id, server_id) => ({
    type: REMOVE_SERVER_MEMBERSHIP,
    member_id,
    server_id
})

export const createServerMembership = (server_membership) => (dispatch) => {
    return ServerMembershipAPIUtils.createServerMembership(server_membership).then((server) => (dispatch(receiveServerMembership(server))))
}

export const deleteServerMembership = (member_id, server_id) => (dispatch) => ((
    ServerMembershipAPIUtils.deleteServerMembership(member_id, server_id).then((member_id, server_id) => (dispatch(removeServerMembership(member_id, server_id))))
))