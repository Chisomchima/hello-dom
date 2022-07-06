export function ObjectValuesAreTruthful(data) {
    return Object.values(data).some((item) => {
        if (item) {
            return true
        }
        return false
    })
}