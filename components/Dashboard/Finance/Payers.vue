<template>
  <div>
    <div>
        <UtilsFilterComponent :disableVisualization="true">
        <template #besideFilterButton>
        <button @click="$bvModal.show('addPayer')" class="btn btn-outline-primary">Add Payer</button>
        </template>
        
            <TableComponent :items="payers" :busy="busy" :fields="fields">
            <template #edit="{ data }">
            <div @click="edit(data.item)" class="text-start">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z" />
                <path fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
              </svg>
            </div>
          </template>
            </TableComponent>
        </UtilsFilterComponent>
        <div>
            <DashboardModalFinanceAddPayer :editData="modalData" @refresh="refreshMe" />
        </div>
    </div>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
export default {
    mixins: [TableCompFun],
    data(){
        return{
        payers: [],
        modalData: {
            name: '',
            address: '',
        },
        fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'address',
          label: 'Address',
          sortable: true,
        },
        {
          key: 'edit',
          label: '',
          sortable: false,
        },
        
      ],
        }
    },
    mounted(){
        this.getPayers()
    },
    methods: {
        // openModal(){
        //     this.$bvModal.show('addPayer')
        // },
        async getPayers(){
            try{
            let response = await this.$api.finance_settings.getPayers({size: 1000})
            console.log(response)
            this.payers = response.results
            this.busy = false
            } catch{
                this.busy = false
            }
        },
        edit(e){
            this.modalData = e
            this.$bvModal.show('addPayer')
        },
        refreshMe(){
            this.getPayers(1)
        }
    }
}
</script>

<style>

</style>