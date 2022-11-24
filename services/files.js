export default axios => ({
    getDocuments(params = {}) {
        return axios.$get("/patient/files/", {
            params
        });
    },
    attachDocument(body) {
        return axios.$post(`/patient/files/`, body);
    },
    updateTemplate(id, body) {
        return axios.$patch(`/pharmacy/templates/${id}/`, body)
    },
    deleteDocument(id) {
        return axios.$delete(`/pharmacy/templates/${id}/`)
    }
});