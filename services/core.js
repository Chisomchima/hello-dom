export default axios => ({
    country(params = {}) {
        return axios.$get("/core/countries/", {
            params
        });
    },
    gender(params = {}) {
        return axios.$get("/core/gender/", {
            params
        });
    },
    martialStatus(params = {}) {
        return axios.$get("/core/marital-status/", {
            params
        });
    },
    occupation(params = {}) {
        return axios.$get("/core/occupations/", {
            params
        });
    },
    religion(params = {}) {
        return axios.$get("/core/religion/", {
            params
        });
    },
    salutation(params = {}) {
        return axios.$get("/core/salutations/", {
            params
        });
    },
    state(params = {}) {
        return axios.$get("/core/states/", {
            params
        });
    },
    providers(params = {}) {
        return axios.$get("encounters/get_providers/Doctors/", {
            params
        });
    },
    clinics(params = {}) {
        return axios.$get("/encounters/clinic/", {
            params
        })
    },
    labUnits(params = {}) {
        return axios.$get("laboratory/lab_unit/", {
            params
        })
    },
    serviceCenter(params = {}) {
        return axios.$get("laboratory/service_center/", {
            params
        })
    },
    specimens(params = {}) {
        return axios.$get("laboratory/lab_specimen_type/", {
            params
        })
    },
    observations(params = {}) {
        return axios.$get("laboratory/lab_observation/", {
            params
        })
    },
    getCoatofArm( params = {}){
        return axios.$get("/core/service_arms/", {
            params
        })
    }
});