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
    },

    // ***********settings****************
    deleteSpecimen(id){
        return axios.$delete(`laboratory/lab_specimen_type/${id}/`)
    },
    deletePanel(id){
        return axios.$delete(`laboratory/lab_panel/${id}/`)
    },

});