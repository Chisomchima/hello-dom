export default axios => ({
    getUsers(params) {
        return axios.$get('/users/', {
            params
        })
    },
    getPermissions(params) {
        return axios.$get('/users/permissions/', {
            params
        })
    },
    createUser(body) {
        return axios.$post(`/users/`, body)
    },
    updateUser(id, body) {
        return axios.$put(`/users/${id}/`, body)
    },
    deleteUser(id) {
        return axios.$delete(`/users/${id}/`)
    },
    resetPassword(id){
        return axios.$get(`auth/users/${id}/password/reset/`)
    },
    deactivateUser(id){
        return axios.$patch(`/users/${id}/deactivate/`)
    },
    activateUser(id){
        return axios.$patch(`/users/${id}/activate/`)
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
    
})