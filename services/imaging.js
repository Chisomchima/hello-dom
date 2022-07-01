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
        return axios.$get('/imaging/lab_unit/', {
            params
        });
    },
    saveLabUnit(body) {
        return axios.$post('/imaging/lab_unit/', body);
    },
    editLabUnit(id,body) {
        return axios.$put(`/imaging/lab_unit/${id}/`, body);
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

});