<template>
  <div>
    <div class="mb-3">
        <DashboardCsoImagingFilter @filter="search($event)"/>
    </div>
    <hr class="m-2">
    <div>
      <b-overlay
        variant="light"
        spinner-variant="primary"
        spinner-type="grow"
        :show="downloading"
        rounded="sm"
    >
        <TableComponent :fields="fields" :pages="pages" :items="items" :busy="busy" 
            @page-changed="getLabOrders($event, currentFilter)"
        >
         <template #action="{ data }">
            <div  class="d-flex">
              <span style="width: 1rem" class="
                  text-center text-12
                  text-info
                  pointer
                  mx-3
                  ">
            <svg @click="save_file(data.item)" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
            width="20" height="20" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 20 20">
            <path fill="currentColor"
                d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z" />
            </svg>
              </span>

              <span @click="mailReport(data.item)" style="width: 1rem" class="text-success text-center mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M33.68 15.26H32v11.45l-7.36-7.36l-1.41 1.41L30.46 28H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0l6.66-6.63h-2.83l-5.24 5.21L5.31 8h14.75l1.15-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V15.24Z" class="clr-i-outline--alerted clr-i-outline-path-1--alerted"/><path fill="currentColor" d="m26.85 1l-5.72 9.91a1.28 1.28 0 0 0 1.1 1.91h11.45a1.28 1.28 0 0 0 1.1-1.91L29.06 1a1.28 1.28 0 0 0-2.21 0Z" class="clr-i-outline--alerted clr-i-outline-path-2--alerted clr-i-alert"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              </span>

          </div>
        </template>
        </TableComponent>
         </b-overlay>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
export default {
    mixins: [TableFunc,FilterLogic],
    data(){
        return{
            currentFilter: {},
            itemsToShow: [],
            downloading: false,
            count: 0,
            fields: [
        {
          key: 'img_order.ordered_datetime',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          sortable: true,
        },
        {
          key: 'img_order.img_id',
          label: 'ASN',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'img_order.service_center.name',
          label: 'Service Center',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },

        {
          key: 'img_order.patient.uhid',
          label: 'UHID',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        { key: 'img_obv.name', label: 'Observation', sortable: true },
        {
          key: 'img_order',
          label: 'Order By',
          formatter: (val, key, item) => {
            return val.ordered_by.first_name + ' ' + val.ordered_by.first_name
          },
          sortable: true,
        },
        { key: 'action', label: '', sortable: false },
        
      ],
        }
    },
    mounted(){
        this.filter(1)
    },
    methods: {
      async mailReport(e){
        try {
          this.downloading = true
          const response = await this.$axios.$get(
            `imaging/imaging_observation_order/${e.id}/reports/mail/`)
          this.$toast({
            type: 'success',
            text: 'Mail sent',
          })

          this.downloading = false
          this.filter(1)
        } catch {
          
        } finally {
          this.downloading = false
        }
    },
    async  save_file(e) {
      console.log(e)
    this.downloading = true
	const response = await fetch(`${process.env.BASE_URL}imaging/imaging_observation_order/${e.id}/reports/download`, {
        headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
        },
    })
    console.log(response)
	if (response.status === 200) {
        const data = await response.blob();
		
        const objectURL = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.download = `Imaging Report_${e.img_order.img_id})`;
        link.href = objectURL;
        this.downloading = false
        this.filter(1)
        link.click();
	}
    else if(response.status === 403){
        this.downloading = false
        this.$toast({
        type: 'info',
        text: `You don't have the permission to perform this action`,
    })
    }

    else{
        this.downloading = false
        this.$toast({
        type: 'error',
        text: `An error occured`,
    })
    }
},
 
     async filter(page, e) {
      this.currentFilter = e
      this.currentPage = page
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({
          ...e,
          page,
          worklist: false,
          'status': 'APPROVED',
          sent: false
        })
        this.items = data.results
        this.pages = data.total_pages
        this.$emit('image', data.total_count)
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    search(e){
      console.log(e)
      this.filter(1, e)
    }
    }

}
</script>

<style>

</style>