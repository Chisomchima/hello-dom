export default axios => ({
    getTemplates(params = {}) {
        return axios.$get("/core/templates/", {
            params
        });
    },
    createTemplate(body) {
        return axios.$post(`/core/templates/`, body);
    },
    updateTemplate(id, body) {
        return axios.$patch(`/core/templates/${id}/`, body)
    },
    deleteTemplate(id) {
        return axios.$delete(`/core/templates/${id}/`)
    },
    createPrescription(body){
        return axios.$post(`/core/templates/`, body);
    },
    updatePrescription(id, body) {
        return axios.$patch(`/core/templates/${id}/`, body)
    },
});