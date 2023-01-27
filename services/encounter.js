export default axios => ({
    getPatient(id, params) {
        return axios.$get(`/encounters/get_patient_encounter/${id}`, {
            params
        });
    },

    getClinic(params) {
        return axios.$get('/encounters/clinic/', {
            params
        });
    },
    getProvider(params) {
        return axios.$get('/encounters/get_providers/Doctors/', {
            params
        })
    },
    saveEncounter(body) {
        return axios.$post('/encounters/',
            body
        )
    },

    newEncountersCount() {
        return axios.$get('/encounters/new/count/')
    },

    nurseSeenCount() {
        return axios.$get('/encounters/ns/count/')
    },

    getEncounter(params) {
        return axios.$get('/encounters/', {
            params
        })
    },
    orderOnEncounter(body, id) {
        return axios.$post(`/encounters/${id}/orders/`, body)
    },
    getOrders(params, id) {
        return axios.$get(`/encounters/${id}/charts/orders/`, {
            params
        })
    },
    acknowledgeEncounter(id) {
        return axios.$patch(`encounters/${id}/acknowledge/`)
    },

    saveChartTemplate(body, id){
        return axios.$post(`/encounters/${id}/charts/`,
            body
        )
    },
    getEncountersChart(id){
        return axios.$get(`/encounters/${id}/charts/`)
    }

});