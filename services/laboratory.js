export default axios => ({
    getPatient(params) {
        return axios.$get('/laboratory/lab_order/', {
            params
        });
    },
    downloadLabOrder(id) {
        return axios.$get(`/laboratory/lab_order/${id}/reports/download`, {
            responseType: 'blob'
        })
    }
});