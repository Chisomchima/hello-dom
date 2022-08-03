export default axios => ({
    savePatient(data) {
        return axios.$post("patient/patients/", data);
    },
    getPatient(id) {
        return axios.$get(`patient/patients/${id}`);
    },
    editPatient(id,body) {
        return axios.$put(`patient/patients/${id}/`,body);
    },
    getPatientbyUHID(uhid) {
        return axios.$get(`patient/patients/?uhid=${uhid}`);
    },
    searchPatient(params) {
        return axios.$get('patient/patients/', {
            params
        })
    },
    getPatientByUHID(uhid) {
        return axios.$get(`patient/patients/uhid/${uhid}/`);
    },


});