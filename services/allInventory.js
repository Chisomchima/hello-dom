export default axios => ({
    getStockMove(params) {
        return axios.$get('inventory/stock_movements/', {
            params
        })
    },
    reateStockMove(params) {
        return axios.$post('inventory/stock_movements/', params)
    },
     //vendors
     getVendors(params = {}){
        return axios.$get(`/inventory/vendors/`, {
            params
        })
    },
})