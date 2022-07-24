export default axios => ({
    addPayer(body) {
        return axios.$post(`/finance/payers/`, body);
    },
    getPayers(params){
        return axios.$get('/finance/payers/', {params});
    },
    editPayer(body, id){
        return axios.$patch(`/finance/payers/${id}/`, body)
    },
    addScheme(body) {
        return axios.$post(`/finance/payer_schemes/`, body);
    },
    getSchemes(body) {
        return axios.$get(`/finance/payer_schemes/`, body);
    },
})