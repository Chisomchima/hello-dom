<template>
  <div>
    <div class="row">
      <div class="page-heading mb-4">Finance</div>
      <div class="col-md-12 mb-4 card">
        <div class="card">
          <div class="card">
            <UtilsBaseCardTab>
              <UtilsCardTab :title="`Find patient`">
                <keep-alive>
                  <div>
                    <FinanceFindPatient />
                  </div>
                </keep-alive>
              </UtilsCardTab>
              <UtilsCardTab :title="`Draft Invoices`">
                <keep-alive>
                  <div>
                    <FinanceDraft />
                  </div>
                </keep-alive>
              </UtilsCardTab>
              <UtilsCardTab :title="`Open Invoices`">
                <keep-alive>
                  <FinanceOpen />
                </keep-alive>
              </UtilsCardTab>
            </UtilsBaseCardTab>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labCount: 0,
      imageCount: 0,
      counts: [0, 0],
    }
  },
  computed: {
    count() {
      return `<span><span class="px-2 py-1 clip badge-success ml-2">${this.labCount}</span></span>`
    },
    count1() {
      return `<span><span class="px-2 py-1 clip badge-success ml-2">${this.imageCount}</span></span>`
    },
  },
  methods: {
    getLabCount(e) {
      console.log(e)
      this.labCount = e
      // this.counts[0] = e
    },
    getImageCount(e) {
      console.log(e)
      this.imageCount = e
      // this.counts[1] = e
    },

    async filter(page, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({
          ...e,
          page,
          worklist: false,
          status: 'APPROVED',
        })
        // this.$emit('image', data.total_count)
        this.counts[1] = data.total_count
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    async getLabOrders(page, e) {
      try {
        this.busy = true
        const data = await this.$api.laborder.getLabOrders({
          ...e,
          page,
          by: entry,
          worklist: false,
          status: 'approved',
        })
        this.counts[0] = data.total_count
        // this.$emit('count', data.total_count)
      } catch (error) {
      } finally {
        this.busy = false
      }
    },
  },
  mounted() {
    // this.filter()
    // this.getLabOrders()
  },
}
</script>

<style lang="scss">
.clip {
  font-size: 13px;
  text-align: center;
  /* border: 1px solid #000; */
  border-radius: 50%;
}
</style>