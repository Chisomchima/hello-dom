export default {
    methods: {
        getGenericDrugs() {
            let response = this.$api.pharmacy
            .getGeneric({ size: 1000 })
            return response
        },
    },
}