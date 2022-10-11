export default axios => ({
    getUsers(params) {
        return axios.$get('/users/', {
            params
        })
    },
    getGroups(params) {
        return axios.$get('/users/groups/', {
            params
        })
    },
    createGroup(body) {
        return axios.$post('/users/groups/', body)
    },
    updateGroup(id, body) {
        return axios.$put(`/users/groups/${id}/`, body)
    },
    createUser(body) {
        return axios.$post(`/users/`, body)
    },
    updateUser(id, body) {
        return axios.$put(`/users/${id}/`, body)
    },
})