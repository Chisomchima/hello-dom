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
    getLabOrder(params){
        return axios.$get(`/laboratory/lab_order/`, {
            params
        })
    },
    getPrice(params) {
        const {itemCode, patientId} = params
        return axios.$get(
          `/finance/billable_items/${itemCode}/patients/${patientId}/price/`
        )
      },

    // ***********settings****************
    deleteSpecimen(id){
        return axios.$delete(`laboratory/lab_specimen_type/${id}/`)
    },
    deletePanel(id){
        return axios.$delete(`laboratory/lab_panel/${id}/`)
    },

    // **********************************
    getPanelsByUnit(params) {
        return axios.$get('laboratory/lab_panel/unit_group/', {
           params
        })
    },
    getSpecimens(params) {
        return axios.$get('laboratory/lab_specimen/', {
           params
        })
    },
    saveSpecimen(body) {
        return axios.$post('laboratory/lab_specimen/', body)
    },
    editSpecimen(body, id) {
        return axios.$patch(`laboratory/lab_specimen/${id}`, body)
    },

});