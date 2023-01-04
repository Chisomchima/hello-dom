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
    },

    createEncTemplate(body){
        return axios.$post(`/encounters/templates/`, body)
    },
    getEncTemplates(params = {}){
        return axios.$get('/encounters/templates/', {
            params
        })
    },
    updateEncTemplate(id, body){
        return axios.$patch(`/encounters/templates/${id}/`, body)
    },
});