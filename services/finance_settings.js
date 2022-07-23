export default axios => ({
    addPayer(body) {
        return axios.$post(`/finance/payers/`, body);
    },
    getPayers(params){
        return axios.$get('/finance/payers/', {params});
    },
    editPayer(body, id){
        return axios.$patch(`/finance/payers/${id}/`, body)
    }
})