export default axios => ({
    getPatient(id) {
        return axios.$get(`/encounters/get_patient_encounter/${id}`);
    },


});