export default axios => ({
    savePatient(data) {
        return axios.$post("patient/patients/", data);
    },
    getPatient(id) {
        return axios.$get(`patient/patients/${id}`);
    }

});