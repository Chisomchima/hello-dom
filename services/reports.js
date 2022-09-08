export default axios => ({
    encounterReport(params = {}) {
        return axios.$get('/encounters/reports/', {
            params
        })
    },
    laboratoryReport(params = {}) {
        return axios.$get('laboratory/reports', {
            params
        })
    },
})