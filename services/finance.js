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
        return axios.$post('/finance/bills/pay/', body);
    },
    auhtorizeHMO(body) {
        return axios.$put('/finance/bills/authorize/', body);
    },
    unReserveBill(body, id) {
        return axios.$patch(`finance/bills/${id}/unreserve/`, body);
    },
    reserveBill(body, id) {
        return axios.$patch(`finance/bills/${id}/reserve/`, body);
    },
    confirmInvoice(id){
        return axios.$patch(`finance/invoices/${id}/confirm/`)
    },
    editBillLine(body, id){
        return axios.$put(`finance/invoices/${id}/bills/`, body)
    },
    payInvoice(body, id){
        return axios.$put(`finance/invoices/${id}/pay/`, body)
    }
});