export default axios => ({
    getLabOrders(params) {
        return axios.$get('laboratory/lab_panel_order/', {
            params
        })
    }
})