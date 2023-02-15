export default axios => ({
    encounterReport(params = {}) {
        return axios.$get('/encounters/reports/', {
            params
        })
    },
    laboratoryReport(params = {}) {
        return axios.$get('laboratory/reports', {
            params
        })
    },
    imagingReport(params = {}) {
        return axios.$get('imaging/reports', {
            params
        })
    },
    patientReport(params = {}) {
        return axios.$get('patient/reports', {
            params
        })
    },
    financeSummaryReport(params = {}) {
        return axios.$get('/finance/reports/revenue/summary', {
            params
        })
    },
    financeDetailedReport(params = {}) {
        return axios.$get('/finance/reports/revenue/detailed', {
            params
        })
    },
    paymentsSummaryReport(params = {}) {
        return axios.$get('finance/reports/payments/summary', {
            params
        })
    },
    paymentsDetailedReport(params = {}) {
        return axios.$get('finance/reports/payments/detailed', {
            params
        })
    },
})