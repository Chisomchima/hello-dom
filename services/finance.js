export default axios => ({
    bills(params = {}) {
        return axios.$get('finance/bills/', {
            params
        })
    },
});