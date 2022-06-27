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
    }


});