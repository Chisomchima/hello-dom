export default axios => ({

    //Directions
    getProducts(params = {}) {
        return axios.$get(`/inventory/products/`, {
            params
        });
    },
    createProduct(body){
        return axios.$post(`/inventory/products/`, body)
    },
    updateProduct(body, id){
        return axios.$patch(`/inventory/products/${id}/`, body)
    },
    deleteProduct(id){
        return axios.$delete(`/inventory/products/${id}/`)
    },
    //Stores
    getStores(params = {}) {
        return axios.$get(`/inventory/stores/`, {
            params
        });
    },
    createStore(body){
        return axios.$post(`/inventory/stores/`, body)
    },
    updateStore(body, id){
        return axios.$patch(`/inventory/stores/${id}/`, body)
    },
    deleteStore(id){
        return axios.$delete(`/inventory/stores/${id}/`)
    },

})