<template>
  <div>
    <div>
      <div v-if="busy">
        <b-row>
          <b-col cols="12" class="mt-4 ml-3">
            <b-skeleton animation="wave" width="70%"></b-skeleton>
            <b-skeleton animation="wave" width="65%"></b-skeleton>
            <b-skeleton animation="wave" width="60%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="70%"></b-skeleton>
            <b-skeleton animation="fade" width="65%"></b-skeleton>
            <b-skeleton animation="fade" width="60%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="30%"></b-skeleton>
            <b-skeleton animation="fade" width="75%"></b-skeleton>
            <b-skeleton animation="fade" width="40%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="70%"></b-skeleton>
            <b-skeleton animation="fade" width="65%"></b-skeleton>
            <b-skeleton animation="fade" width="60%"></b-skeleton>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="text-grey text-18 mb-0">Orders</h4>
        </div>

        <br />



        <div v-if="labitems != null && labitems.length > 0" class="p-2">
          <p class="text-16 text-grey text-underline">Laboratory orders</p>
          <TableComponent :perPage="filter.size" :pages="pages" :items="labitems" :busy="busy" :paginate="false"
            :fields="labfields" @row-hovered="showToolTip" :currentPage="currentPage" @sortData="showToolTip"
            @page-changed="filter($event, currentFilter)">
            <template #created_at="{ data }">
              <div class="">
                <span>{{ data.item.created_at }}</span>
              </div>
            </template>
            <template #value.laboratory="{ data }">
              <div>
                {{ labPanelNames(data.item.value.lab_panel_orders) }}
              </div>
            </template>
            <template #value.imaging="{ data }">
              <pre class="d-none">
                                {{ data.item }}
                              </pre>
            </template>
          </TableComponent>
        </div>
        <div v-else class="p-3">
          <p>No laboratory orders.</p>
          <div class="text-primary my-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
              <g fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
              </g>
            </svg>
          </div>
        </div>

        <div v-if="imgitems != null && imgitems.length > 0" class="p-2">
          <p class="text-16 text-grey text-underline">Imaging orders</p>
          <TableComponent :perPage="filter.size" :pages="pages" :items="imgitems" :busy="busy" :paginate="false"
            :fields="imgfields" @row-hovered="showToolTip" :currentPage="currentPage" @sortData="showToolTip"
            @page-changed="filter($event, currentFilter)">
            <template #created_at="{ data }">
              <div class="">
                <span>{{ data.item.created_at }}</span>
              </div>
            </template>
            <template #value.imaging="{ data }">
              <div>
                {{ imgObvNames(data.item.value.img_obv_orders) }}
              </div>
            </template>
          </TableComponent>
        </div>
        <div v-else class="p-3">
          <p>No imaging orders.</p>
          <div class="text-primary my-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
              <g fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
              </g>
            </svg>
          </div>
        </div>
        <div v-if="drugitems && drugitems.length > 0" class="p-2">
          <p class="text-16 text-grey text-underline">Prescription orders</p>
          <TableComponent :perPage="filter.size" :pages="pages" :items="drugitems" :busy="busy" :paginate="false"
            :fields="drugfields" :currentPage="currentPage" @page-changed="filter($event, currentFilter)">
            <template #created_at="{ data }">
              <div class="">
                <span>{{ data.item.created_at }}</span>
              </div>
            </template>
          </TableComponent>
        </div>
        <div v-else class="p-3">
          <p>No prescription orders.</p>
          <div class="text-primary my-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
              <g fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- ************************************************************ -->
    </div>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import arrayBreakdown from '~/mixins/arrayBreakdown'
import { DateTime } from 'luxon'
export default {
  mixins: [TableCompFun, arrayBreakdown],
  data() {
    return {
      show: false,
      emptyState: true,
      pages: 1,
      currentPage: 1,
      arr: [],

      labfields: [
        {
          key: 'created_at',
          label: 'Order date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          sortable: true,
        },
        {
          key: 'value.laboratory',
          label: 'Laboratory orders',
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value
            } else {
              return ''
            }
          },
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          sortable: true,
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
        },
      ],
      imgfields: [
        {
          key: 'created_at',
          label: 'Order date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          sortable: true,
        },
        {
          key: 'value.imaging',
          label: 'Imaging orders',
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value
            } else {
              return ''
            }
          },
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          sortable: true,
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
        },
      ],
      drugfields: [
        {
          key: 'created_at',
          label: 'Order date',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          sortable: true,
        },
        {
          key: 'value.prc_id',
          label: 'Prescription ID',
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value
            } else {
              return ''
            }
          },
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          sortable: true,
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
        },
      ],

      filter: {
        size: 10,
      },
    }
  },
  props: {
    consultationData: {
      type: Object,
      required: false,
    },
    orders: {
      type: Object,
      required: false,
    },
  },
  computed: {
    labitems() {
      return this.orders.laboratory
    },
    imgitems() {
      return this.orders.imaging
    },
    drugitems() {
      return this.orders.prescription
    }
  },
  mounted() {
    // this.getOrders()
  },
  watch: {
  },
  methods: {

    labPanelNames(e) {
      console.log(e)
      let arr = e
      let newArr = []
      for (let x = 0; x < arr.length; x++) {
        newArr.push(arr[x].panel.name)
      }
      let str = newArr.join(', ')
      return str
    },
    imgObvNames(e) {
      let arr = e
      let newArr = []
      for (let x = 0; x < arr.length; x++) {
        newArr.push(arr[x].img_obv.name)
      }
      let str = newArr.join(', ')
      return str
    },

    handleImagingProps(list) {
      this.imagingOption = list
    },

    showToolTip(e) {
      // console.log(e)
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-secondary {
  color: $COLOR_TWO;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>