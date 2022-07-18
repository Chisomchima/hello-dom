export default axios => ({
    bills(params = {}) {
        return axios.$get('/finance/bills/', {
            params
        })
    },
    paymentMethods(params = {}) {
        return axios.$get('/finance/payment_methods/', {
            params
        })
    },

    makePayment(body) {
        return axios.$post('/finance/payments/', body);
    }
});