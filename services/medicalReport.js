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
    getLabOrder(id, params){
        return axios.$get(`/laboratory/lab_panel_order/?lab_order=${id}`
        , {
            params
        }
        )
    },
    getImgingOrder(id, params){
        return axios.$get(`/imaging/imaging_observation_order/?img_order=${id}`
        , {
            params
        }
        )
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
    createOrder(body){
        return axios.$post(`/medical-packages/orders/`, body)
    },
    editOrder(body, id){
        return axios.$patch(`/medical-packages/orders/${id}/`, body)
    },
    deleteOrder(id){
        return axios.$delete(`/medical-packages/service-center/${id}/`)
    },
    getOrder(params = {}){
        return axios.$get(`/medical-packages/orders/`, { params });
    },
    acknowlegeOrder(id,body){
        return axios.$post(`/medical-packages/orders/${id}/acknowledge/`, { body });
    },
    cancelOrder(id,body){
        return axios.$post(`/medical-packages/orders/${id}/cancel/`, { body });
    }
})