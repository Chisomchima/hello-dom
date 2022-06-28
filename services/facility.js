export default axios => ({
    departments(params = {}) {
        return axios.$get("/facilities/departments/", {
            params
        });
    },
    
});