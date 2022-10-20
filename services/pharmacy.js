export default axios => ({

    //Directions
    getDirections(params = {}) {
        return axios.$get(`/pharmacy/config/directions/`, {
            params
        });
    },
    createDirections(body){
        return axios.$post(`/pharmacy/config/directions/`, body)
    },
    updateDirections(body, id){
        return axios.$patch(`/pharmacy/config/directions/${id}`, body)
    },
    deleteDirections(id){
        return axios.$delete(`/pharmacy/config/directions/${id}`)
    },

    //Doses
    getDoses({params = {}}){
        return axios.$get(`/pharmacy/config/doses/`, {
            params
        })
    },
    createDosage(body){
        return axios.$post(`/pharmacy/config/doses/`, body)
    },
    updateDosage(body, id){
        return axios.$patch(`/pharmacy/config/doses/${id}`, body)
    },
    deleteDosage(id){
        return axios.$delete(`/pharmacy/config/doses/${id}`)
    },

    //Duration
    getDurations({params= {}}){
        return axios.$get(`/pharmacy/config/durations/`, {
            params
        })
    },
    createDurations(body){
        return axios.$post(`/pharmacy/config/durations/`, body)
    },
    updateDurations(body, id){
        return axios.$patch(`/pharmacy/config/durations/${id}`, body)
    },
    deleteDurations(id){
        return axios.$delete(`/pharmacy/config/durations/${id}`)
    },

    //Frequencies
    getFrequencies({params}){
        return axios.$get(`/pharmacy/config/frequencies/`, {params})
    },
    createFrequency(body){
        return axios.$post(`/pharmacy/config/frequencies/`, body)
    },
    updateFrequency(body, id){
        return axios.$patch(`/pharmacy/config/frequencies/${id}`, body)
    },
    deleteFrequency(id){
        return axios.$delete(`/pharmacy/config/frequencies/${id}`)
    },

    //Routes

    getRoutes({params = {}}){
        return axios.$get(`/pharmacy/config/routes/`, {
            params
        })
    },
    createRoute(body){
        return axios.$post(`/pharmacy/config/routes/`, body)
    },
    updateRoutes(body, id){
        return axios.$patch(`/pharmacy/config/routes/${id}`, body)
    },
    deleteRoutes(id){
        return axios.$delete(`/pharmacy/config/routes/${id}`)
    },

    //Units
    getUnits(params = {}){
        return axios.$get(`/pharmacy/config/units/`, {
            params
        })
    },
    createUnit(body){
        return axios.$post(`/pharmacy/config/units/`, body)
    },
    updateUnit(body, id){
        return axios.$patch(`/pharmacy/config/units/${id}`, body)
    },
    deleteUnit(id){
        return axios.$delete(`/pharmacy/config/units/${id}`)
    }
})