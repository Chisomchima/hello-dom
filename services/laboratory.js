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
    },

    getServiceCenter(params) {
        return axios.$get('/laboratory/service_center/', {
           params
        })
    },

    getLabPanel(params) {
        return axios.$get('/laboratory/lab_panel/', {
           params
        })
    },
    saveLabOrder(body) {
        return axios.$post('/laboratory/lab_order/', body)
    }


});