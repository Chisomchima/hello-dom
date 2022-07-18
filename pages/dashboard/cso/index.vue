<template>
  <div>
    <div class="row">
        <div class="col-md-12 mb-4">
            <div class="card">
                <div class="">
                <UtilsBaseCardTab>
                    <UtilsCardTab :title="`Lab Orders  ${labCount ? labCount : ''}`">
                    <template #counts>
                        <div style="width: .5rem; height: .5rem; border-radius: 50%; background: #000">
                            {{labCount}}
                        </div>
                    </template>
                        <keep-alive>
                            <DashboardCsoLabOrders @count="getLabCount"/>
                        </keep-alive>
                    </UtilsCardTab>
                    <UtilsCardTab :title="`Imaging  ${imageCount ? imageCount : ''}`">
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
            imageCount: 0 
        }
    }, 
    methods: {
        getLabCount(e){
            this.labCount = e
        },
        getImageCount(e){
            this.imageCount = e
        }
    }
}
</script>

<style>

</style>