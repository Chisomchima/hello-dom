export default axios => ({

    //Directions
    getDirections(params = {}) {
        return axios.$get(`/pharmacy/directions/`, {
            params
        });
    },
    createDirections(body){
        return axios.$post(`/pharmacy/directions/`, body)
    },
    updateDirections(body, id){
        return axios.$patch(`/pharmacy/directions/${id}/`, body)
    },
    deleteDirections(id){
        return axios.$delete(`/pharmacy/directions/${id}/`)
    },

    //Doses
    getDoses({params = {}}){
        return axios.$get(`/pharmacy/doses/`, {
            params
        })
    },
    createDosage(body){
        return axios.$post(`/pharmacy/doses/`, body)
    },
    updateDosage(body, id){
        return axios.$patch(`/pharmacy/doses/${id}/`, body)
    },
    deleteDosage(id){
        return axios.$delete(`/pharmacy/doses/${id}/`)
    },

    //Duration
    getDurations({params= {}}){
        return axios.$get(`/pharmacy/durations/`, {
            params
        })
    },
    createDurations(body){
        return axios.$post(`/pharmacy/durations/`, body)
    },
    updateDurations(body, id){
        return axios.$patch(`/pharmacy/durations/${id}/`, body)
    },
    deleteDurations(id){
        return axios.$delete(`/pharmacy/durations/${id}/`)
    },

    //Frequencies
    getFrequencies({params}){
        return axios.$get(`/pharmacy/frequencies/`, {params})
    },
    createFrequency(body){
        return axios.$post(`/pharmacy/frequencies/`, body)
    },
    updateFrequency(body, id){
        return axios.$patch(`/pharmacy/frequencies/${id}/`, body)
    },
    deleteFrequency(id){
        return axios.$delete(`/pharmacy/frequencies/${id}/`)
    },

    //Routes

    getRoutes({params = {}}){
        return axios.$get(`/pharmacy/routes/`, {
            params
        })
    },
    createRoute(body){
        return axios.$post(`/pharmacy/routes/`, body)
    },
    updateRoutes(body, id){
        return axios.$patch(`/pharmacy/routes/${id}/`, body)
    },
    deleteRoutes(id){
        return axios.$delete(`/pharmacy/routes/${id}/`)
    },

    //Units
    getUnits(params = {}){
        return axios.$get(`/pharmacy/units/`, {
            params
        })
    },
    createUnit(body){
        return axios.$post(`/pharmacy/units/`, body)
    },
    updateUnit(body, id){
        return axios.$patch(`/pharmacy/units/${id}/`, body)
    },
    deleteUnit(id){
        return axios.$delete(`/pharmacy/units/${id}/`)
    }
})