export default axios => ({
    country(params = {}) {
        return axios.$get("/core/countries/",{
            params
        });
    },
    gender(params = {}) {
        return axios.$get("/core/gender/",{
            params
        });
    },
    martialStatus(params = {}) {
        return axios.$get("/core/marital-status/",{
            params
        });
    },
    occupation(params = {}) {
        return axios.$get("/core/occupations/",{
            params
        });
    },
    religion(params = {}) {
        return axios.$get("/core/religion/",{
            params
        });
    },
    salutation(params = {}) {
        return axios.$get("/core/salutations/",{
            params
        });
    },
    state(params = {}) {
        return axios.$get("/core/states/",{
            params
        });
    },
});