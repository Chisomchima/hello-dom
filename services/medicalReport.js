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
})