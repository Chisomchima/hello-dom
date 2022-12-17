export default axios => ({
    getTask(params = {}) {
        return axios.$get('/nursing/orders/', {
            params
        });
    },
    createNursingTask(body) {
        return axios.$post(`/nursing/orders/`, body);
    },

    closeNursingOrder(id){
        return axios.$patch(`/nursing/orders/${id}/close/`)
    },
    cancelNursingOrder(id){
        return axios.$patch(`/nursing/orders/${id}/cancel/`)
    },
    getServices(params = {}) {
        return axios.$get('/nursing/services/', {
            params
        });
    },
    deleteDocument(id) {
        return axios.$delete(`/patient/files/${id}/`)
    },

    // Get task by ID

    getSpecificTask(id) {
        return axios.$get(`/nursing/orders/${id}/`);
    },

    getTaskSlug(params = {}, id){
        return axios.$get(`/nursing/orders/${id}/tasks/`, {
            params
        });
    },
    createTask(body, id) {
        return axios.$post(`/nursing/orders/${id}/tasks/`, body);
    },

    closeNursingTask(orderID, taskID){
        return axios.$patch(`/nursing/orders/${orderID}/tasks/${taskID}/close/`)
    },

    // Config

    createStation(body) {
        return axios.$post(`/nursing/stations/`, body);
    },
    getStation(params = {}) {
        return axios.$get('/nursing/stations/', {
            params
        });
    },
    editStation(body, id) {
        return axios.$patch(`/nursing/stations/${id}/`, body)
    },
    deleteStation(id){
        return axios.$delete(`/nursing/stations/${id}/`)
    },

    //services

    createServices(body) {
        return axios.$post(`/nursing/services/`, body);
    },
    getServices(params = {}) {
        return axios.$get('/nursing/services/', {
            params
        });
    },
    editServices(body, id) {
        return axios.$patch(`/nursing/services/${id}/`, body)
    },

    deleteServices(id){
        return axios.$delete(`/nursing/services/${id}/`)
    },

});