export default axios => ({
    getTask(params = {}) {
        return axios.$get('/nursing/orders/', {
            params
        });
    },
    createNursingTask(body) {
        return axios.$post(`/nursing/orders/`, body);
    },
    getServices(params = {}) {
        return axios.$get('/nursing/services/', {
            params
        });
    },
    deleteDocument(id) {
        return axios.$delete(`/patient/files/${id}/`)
    }
});