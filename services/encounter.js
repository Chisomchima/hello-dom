export default axios => ({
    getPatient(id) {
        return axios.$get(`/encounters/get_patient_encounter/${id}`);
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
        return axios.$post('/encounters/encounter/',
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
        return axios.$get('/encounters/encounter/', {
            params
        })
    }


});