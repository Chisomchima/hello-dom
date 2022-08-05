export default axios => ({
    getServiceCenter(params) {
        return axios.$get('/imaging/service_center/', {
            params
        });
    },
    saveServiceCenter(body) {
        return axios.$post('/imaging/service_center/', body);
    },
    editServiceCenter(id,body) {
        return axios.$put(`/imaging/service_center/${id}/`, body);
    },

    getLabUnit(params) {
        return axios.$get('/imaging/modality/', {
            params
        });
    },
    saveLabUnit(body) {
        return axios.$post('/imaging/modality/', body);
    },
    editLabUnit(id,body) {
        return axios.$put(`/imaging/modality/${id}/`, body);
    },



    getObservation(params) {
        return axios.$get('/imaging/imaging_observation/', {
            params
        });
    },
    saveObservation(body) {
        return axios.$post('/imaging/imaging_observation/', body);
    },
    editObservation(id,body) {
        return axios.$put(`/imaging/imaging_observation/${id}/`, body);
    },

    deleteObv(id){
        return axios.$delete(`imaging/imaging_observation/${id}/`)
    },

    getOrder(params) {
        return axios.$get('/imaging/imaging_order/', {
            params
        });
    },
    saveOrder(body) {
        return axios.$post('/imaging/imaging_order/', body);
    },
    editOrder(id,body) {
        return axios.$put(`/imaging/imaging_order/${id}/`, body);
    },

    getObservationOrder(params) {
        return axios.$get('/imaging/imaging_observation_order/', {
            params
        });
    },

    patchObservationOrder(id,body) {
        return axios.$patch(`/imaging/imaging_observation_order/${id}/`, body);
    },
});