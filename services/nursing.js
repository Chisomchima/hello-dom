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
    },

    // Get task by ID

    getSpecificTask(id) {
        return axios.$get(`/nursing/orders/${id}/tasks`);
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