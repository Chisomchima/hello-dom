export default axios => ({
    bills(params = {}) {
        return axios.$get('/finance/bills/', {
            params
        })
    },

    makePayment(body) {
        return axios.$post('/finance/payments/', body);
    }
});