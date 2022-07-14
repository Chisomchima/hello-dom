import { ObjectValuesAreTruthful } from '@/utils/friendly-helpers'
export default {

    watch: {
        '$route.query.filter': {
            handler(newVal) {
                if (newVal) {
                    const filterObject = JSON.parse(newVal)
                    const hasValues = ObjectValuesAreTruthful(filterObject)
                    if (hasValues) {
                        this.filter(1, filterObject)
                    }
                    // }else{
                    //     this.filter(1, {})
                    // }
                }
            },
            deep: true,
            immediate: true,
        },
    },
}