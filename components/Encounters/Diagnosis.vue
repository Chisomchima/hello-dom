<template>
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
      </b-row>
    </div>
    <div v-else>
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="text-grey text-18 mb-0">Diagnosis</h4>
      </div>

      <br />

      <div class="pt-3" v-if="comments.length > 0">
        <TableComponent :items="comments" :perPage="1000" :fields="fields" :paginate="false">
          <template #created_at="{ data }">
            <div class="">
              <span>{{ data.item.created_at }}</span>
            </div>
          </template>

          <template #value="{ data }">
            <div>
              <div>
                {{ diagnosisNames(data.item.value.comment) }}
              </div>
            </div>
          </template>
          <template #option="{ data }">
            <div class="text-capitalize">
              <div class="p-2" v-if="
                data.item.value.option === 'working' ||
                data.item.value.option === 'confirmed'
              ">

                {{ data.item.value.option }}
              </div>
              <div class="p-2" v-else-if="data.item.value.option === ''">

                {{ data.item.value.option }}
              </div>
              <div class="p-2" v-else>

                {{ data.item.value.option }}
              </div>
            </div>
          </template>
          <template #action="{ data }">
            <!-- <pre>{{data.item}}</pre> -->

          </template>
        </TableComponent>
      </div>

      <div class="p-3 text-center" v-else>
        <div class="text-16 text-grey">
          No Diagnosis.
        </div>
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
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
export default {
  mixins: [TableFunc],
  data() {
    return {
      busy: false,

      allow: true,
      step: true,
      role: 0,
      diagnosis: [
        {
          comment: [],
          option: null,
        },
      ],
      searchParam: {
        size: 10,
        search: '',
        type: 'icd10',
      },

      form: {},
      options: ['working', 'confirmed'],
      icdTernCollection: [],
      fields: [
        {
          key: 'value',
          label: 'Diagnosis',
          formatter: (value) => {
            return value ? value : value
          },
          sortable: true,
        },
        { key: 'value.option', label: 'Option', sortable: true },
        {
          key: 'created_by',
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
          label: 'Added by',
        },
        {
          key: 'created_at',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
          label: 'Time Stamp',
          sortable: true,
        },
        {
          key: 'action',
          label: '',
        },
      ],
    }
  },
  watch: {
  },
  props: {
    consultationData: {
      type: Object,
      default: () => { },
    },
    comments: {
      type: Array,
      default: () => [],
    }
  },
  mounted() {
  },
  methods: {
    diagnosisNames(e) {
      if (typeof e === 'string') {
        return e
      }
      if (Array.isArray(e)) {
        let arr = e
        let newArr = []
        for (let x = 0; x < arr.length; x++) {
          newArr.push(arr[x])
        }
        let str = newArr.join(', ')
        return str
      }
      if (typeof e === 'object') {
        return e.case
      }
    },

    addNewRecord() {
      this.diagnosis.push({
        comment: [],
        option: null,
      })
    },

    async getDiagnosis() {
      try {
        this.busy = true
        let response = await this.$axios.$get(
          `encounters/${this.$route.params.id}/charts/diag/`
        )

        let newProp = response.result
        const formatted = newProp.map((el) => ({
          ...el,
          confirmed: el.value.confirmed ? true : false,
        }))
        this.comments = formatted
        this.busy = false
      } catch {
      } finally {
        this.busy = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hov:hover {
  background: $COLOR_THREE;
  color: #fff;
}

.hov {
  color: $COLOR_THREE;
}
</style>>