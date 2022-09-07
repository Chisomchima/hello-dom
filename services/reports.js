export default axios => ({
    encounterReport(params = {}) {
        return axios.$get('/encounters/reports/', {
            params
        })
    },
})