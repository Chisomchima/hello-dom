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
    getPayerSchemes(params) {
        return axios.$get(`/finance/payer_schemes/`, {params});
    },
    viewPayer(id) {
        return axios.$get(`/finance/payers/${id}`);
    },
    getBillableItems(params){
        return axios.$get(`/finance/billable_items/`, {params})
    },
    editBillableItems(body, id){
        return axios.$patch(`/finance/billable_items/${id}/`, body)
    }
})