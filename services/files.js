export default axios => ({
    getDocuments(params = {}) {
        return axios.$get("/patient/files/", {
            params
        });
    },
    attachDocument(body) {
        return axios.$post(`/patient/files/`, body);
    },
    updateDocument(id, body) {
        return axios.$patch(`/patient/files/${id}/`, body)
    },
    deleteDocument(id) {
        return axios.$delete(`/patient/files/${id}/`)
    }
});