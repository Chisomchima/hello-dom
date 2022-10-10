export default axios => ({
    getUsers(params) {
        return axios.$get('/users/', {
            params
        })
    },
})