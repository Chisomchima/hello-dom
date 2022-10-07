export default axios => ({
    createDepartment(body) {
        return axios.$post("/facilities/departments/", body);
    },
    editDepartment(id, body) {
        return axios.$put(`/facilities/departments/${id}/`, body);
    },
    getDepartments(params) {
        return axios.$get("/facilities/departments/", {
            params
        });
    },

    createClinic(body) {
        return axios.$post("/encounters/clinic/", body);
    },
    editClinic(id, body) {
        return axios.$put(`/encounters/clinic/${id}/`, body);
    },
    getClinic(params) {
        return axios.$get("/encounters/clinic/", {
            params
        });
    },
    
});