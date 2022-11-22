export default axios => ({
    getTemplates(params = {}) {
        return axios.$get("/pharmacy/templates/", {
            params
        });
    },
    createTemplate(body) {
        return axios.$post(`/pharmacy/templates/`, body);
    },
    updateTemplate(id, body) {
        return axios.$patch(`/pharmacy/templates/${id}/`, body)
    },
    deleteTemplate(id) {
        return axios.$delete(`/pharmacy/templates/${id}/`)
    }
});