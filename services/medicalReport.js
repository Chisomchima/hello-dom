export default axios => ({
    getMedicalRecords(params) {
        return axios.$get('/medical-packages/', {
            params
        })
    },
    getImaging(params) {
        return axios.$get('/imaging/imaging_observation/', params)
    },
    getLabPanel(params) {
        return axios.$get('/laboratory/lab_panel/', params)
    },
    createMedicalRecord(params) {
        return axios.$post('/medical-packages/', params)
    },
    editMedicalRecord(id, param) {
        return axios.$put(`/medical-packages/${id}/`, param)
    },
    deleteMedicalRecord(id) {
        return axios.$delete(`/medical-packages/${id}/`)
    },
    getParents(params = {}){
        return axios.$get(`/medical-packages/category/`, { params });
    },
    deleteCategory(id){
        return axios.$delete(`/medical-packages/category/${id}/`)
    },
    editParent(body, id){
        return axios.$patch(`/medical-packages/category/${id}/`, body)
    },
    createParent(body){
        return axios.$post(`/medical-packages/category/`, body)
    },
    createServiceCenter(body){
        return axios.$post(`/medical-packages/service-center/`, body)
    },
    editServiceCenter(body, id){
        return axios.$patch(`/medical-packages/service-center/${id}/`, body)
    },
    deleteServiceCenter(id){
        return axios.$delete(`/medical-packages/service-center/${id}/`)
    },
    getServiceCenters(params = {}){
        return axios.$get(`/medical-packages/service-center/`, { params });
    },
})