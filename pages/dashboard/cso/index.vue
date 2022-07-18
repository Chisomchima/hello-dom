<template>
  <div>
    <div class="row">
        <div class="col-md-12 mb-4">
            <div class="card">
                <div class="">
                <UtilsBaseCardTab :counts="counts">
                    <UtilsCardTab  :title="`Lab Orders`">
                        <keep-alive>
                            <DashboardCsoLabOrders @count="getLabCount"/>
                        </keep-alive>
                    </UtilsCardTab>
                    <UtilsCardTab  :title="`Imaging`">
                        <keep-alive>
                            <DashboardCsoImageOrders @image="getImageCount"/>
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
    data(){
        return{
            labCount: 0,
            imageCount: 0,
            counts: [0, 0]
        }
    }, 
    methods: {
        getLabCount(e){
            console.log(e)
            // this.labCount = e
            // this.counts[0] = e
        },
        getImageCount(e){
            console.log(e)
            // this.imageCount = e
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
          'status': 'APPROVED'
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
                this.busy = true;
                const data = await this.$api.laborder.getLabOrders({ ...e, page, by: entry, worklist: false, status: 'approved', })
                this.counts[0] = data.total_count
                // this.$emit('count', data.total_count)
            } catch (error){}
            finally {
                this.busy = false;
            }
    },
    },
    mounted(){
      this.filter() 
      this.getLabOrders() 
    }
}
</script>

<style>

</style>