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
    editScheme(body, id){
        return axios.$put(`/finance/payer_schemes/${id}/`, body)
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
    },
    addPriceList(body) {
        return axios.$post(`/finance/price_lists/`, body);
    },
    getPriceList(params){
        return axios.$get('/finance/price_lists/', {params});
    },
    editPriceList(body, id){
        return axios.$patch(`/finance/price_lists/${id}/`, body)
    },
    viewPricelist(id) {
        return axios.$get(`/finance/price_lists/${id}`);
    },
    getPriceListItems(params){
        return axios.$get('/finance/price_list_items/', {params});
    },
    bulkUploadPriceListItems(body, id){
        return axios.$post(`/finance/price_lists/${id}/price_list_items/spreadsheet_upload/`, body)
    },
    bulkUploadBillableItems(body){
        return axios.$post(`/finance/billable_items/spreadsheet_upload/`, body)
    },

    // **********************************

    addPaymentMethod(body){
        return axios.$post(`finance/payment_methods/`, body)
    },
    getPaymentMethods(params){
        return axios.$get(`finance/payment_methods/`, {params})
    },
    editPaymentMethod(body, id){
        return axios.$patch(`/finance/payment_methods/${id}/`, body)
    },
})