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
        <div
          @click="showComment"
          style="cursor: pointer"
          v-show="step"
          id="button-20"
        >
          <div class="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-plus-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
              />
            </svg>
          </div>

          <b-tooltip target="button-20" placement="bottom">
            Add Diagnosis
          </b-tooltip>
        </div>
        <div @click.prevent="closeForm" id="button-22" v-show="kink">
          <div class="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-dash-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
          </div>

          <b-tooltip target="button-22" placement="bottom">Close </b-tooltip>
        </div>
      </div>

      <br />
      <div v-show="tag" class="mr-3">
        <!-- <textarea v-model="diagnosis" class="p-3 form-control ng-untouched ng-pristine ng-valid" cols="40"
        rows="10"></textarea> -->

        <div
          v-for="(item, index) in diagnosis"
          :key="index"
          class="row align-items-end p-1 m-2"
        >
          <div class="col-lg-8 col-md-8 col-sm-8 w-100">
            <!-- <small class="text-grey text-14">Diagnosis</small> -->

            <v-select
              class="text-14 text-capitalize"
              v-model="item.comment"
              style="height: 35px"
              :options="icdTernCollection"
              :reduce="(option) => option.case"
              multiple
              :placeholder="'Diagnosis'"
              :loading="busy"
              label="case"
              @search="
                (search, loading) => {
                  loading(busy)
                  searchOptions(search)
                }
              "
              taggable
            >
              <template #option="option">
                <div class="">
                  <span>{{ option.code }}</span> <span>{{ option.case }}</span>
                </div>
              </template>
              <template v-if="icdTernCollection.length > 0" #list-footer>
                <li
                  @click="openModal(index)"
                  class="p-2 hov"
                  style="text-align: center"
                >
                  Click to see more options
                </li>
              </template>
            </v-select>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 w-100">
            <!-- <small class="text-grey text-14">Options</small> -->
            <v-select
              class="text-14 text-capitalize"
              v-model="item.option"
              style="height: 35px"
              :options="options"
              :placeholder="'Options'"
            ></v-select>
          </div>

          <div class="text-success point pb-1">
            <svg
              @click="removeRecord(index)"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="text-success point pb-1">
          <svg
            @click="addNewRecord"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm1 15a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div
          style="height: 38px"
          class="w-100 mt-3 mr-5 text-16 d-flex justify-content-end"
        >
          <BaseButton
            :disabled="
              consultationData.bill.cleared_status === 'CLEARED' ? false : true
            "
            @click.prevent="addDiagnosis"
            class="btn-primary mr-3"
            >Save</BaseButton
          >
        </div>
      </div>

      <div class="pt-3" v-if="comments.length > 0">
        <TableComponent
          :items="comments"
          :perPage="1000"
          :fields="fields"
          :paginate="false"
        >
          <!-- <template #clear="{ data }">
            <div>
              {{diagnosisNames(data.item.value.comment)}}
            </div>
          </template> -->
          <template #value="{ data }">
            <div>
              <div>
                {{ diagnosisNames(data.item.value.comment) }}
              </div>
            </div>
          </template>
          <template #option="{ data }">
            <div class="text-capitalize">
              <div
                class="p-2"
                v-if="
                  data.item.value.option === 'working' ||
                  data.item.value.option === 'confirmed'
                "
              >
                <!-- <v-select
                  class="text-capitalize text-14"
                  placeholder="Select option"
                  label="name"
                  v-model="data.item.value.option"
                  :options="options"
                  :disabled="true"
                ></v-select> -->
                {{ data.item.value.option }}
              </div>
              <div class="p-2" v-else-if="data.item.value.option === ''">
                <!-- <v-select
                  class="text-capitalize text-14"
                  placeholder="Select option"
                  label="name"
                  v-model="diagnosis.option"
                  :options="options"
                ></v-select> -->
                {{ data.item.value.option }}
              </div>
              <div class="p-2" v-else>
                <!-- <v-select
                  class="text-capitalize text-14"
                  placeholder="Select option"
                  label="name"
                  :options="options"
                ></v-select> -->
                {{ data.item.value.option }}
              </div>
            </div>
          </template>
          <template #action="{ data }">
            <!-- <pre>{{data.item}}</pre> -->
            <span
              @click="confirmDiagnosis(data.item.value, data.item.id)"
              v-if="
                data.item.value.option === 'working' &&
                data.item.confirmed === false
              "
              class="text-14 badge-warning rounded text-center p-1 text-white"
            >
              C
            </span>
            <!-- <span v-else-if="data.item.value.option === 'confirmed'" class="text-14 badge-success rounded text-center p-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    d="M11.528 1.6a.6.6 0 0 1 .944 0l1.809 2.3a.6.6 0 0 0 .635.207l2.815-.798a.6.6 0 0 1 .764.554l.11 2.925a.6.6 0 0 0 .393.54l2.747 1.01a.6.6 0 0 1 .292.897l-1.63 2.431a.6.6 0 0 0 0 .668l1.63 2.431a.6.6 0 0 1-.292.897l-2.747 1.01a.6.6 0 0 0-.392.54l-.111 2.925a.6.6 0 0 1-.764.554l-2.815-.798a.6.6 0 0 0-.636.206L12.473 22.4a.6.6 0 0 1-.944 0L9.72 20.1a.6.6 0 0 0-.635-.207l-2.815.798a.6.6 0 0 1-.764-.554l-.11-2.925a.6.6 0 0 0-.393-.54l-2.747-1.01a.6.6 0 0 1-.292-.897l1.63-2.431a.6.6 0 0 0 0-.668l-1.63-2.431a.6.6 0 0 1 .292-.897l2.747-1.01a.6.6 0 0 0 .392-.54l.111-2.925a.6.6 0 0 1 .764-.554l2.815.798A.6.6 0 0 0 9.72 3.9l1.81-2.3Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 12l2 2l4-4" />
                </g>
              </svg>
            </span> -->
            <div
              v-else-if="data.item.value.option === ''"
              class="text-14 text-start p-1 text-white"
            >
              <span @click="addDiagnosis" class="text-success m-1"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                  /></svg
              ></span>
              <span @click="deleteItem(data.item)" class="text-danger m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"
                  />
                </svg>
              </span>
            </div>
          </template>
        </TableComponent>
        <!-- <div class="">
          <button @click="addItem" class="btn btn-sm btn-outline-primary">
            Add
          </button>
        </div> -->

        <div class="col-md-6 d-none">
          <Dropdown
            width="500px"
            optionLabel="brand"
            placeholder="Select a Car"
            :filter="true"
            filterPlaceholder="Find Car"
          />
        </div>
      </div>

      <div class="p-5 text-center" v-else>
        <div class="text-16 text-grey">
          No Diagnosis added yet, click the
          <span style="position: relative; top: -3px" class="text-primary mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
              /></svg
          ></span>
          icon to add diagnosis
        </div>
        <div class="text-primary my-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="30"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div>
        <DashboardModalICD10Modal
          @page-changed="getICD10($event, searchParam)"
          @diagnosis="setDiagnosis"
          @searchParam="searchByString"
          :pages="pages"
          :index="role"
          :options="icdTernCollection"
          @refresh="getICD10(1, searchParam)"
          :consultationData="consultationData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import Dropdown from 'primevue/dropdown'
import TableFunc from '~/mixins/TableCompFun'
export default {
  mixins: [TableFunc],
  components: { Dropdown },
  data() {
    return {
      tag: false,
      isLoading: false,
      busy: false,
      kink: false,
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
        type: 'icd10'
      },
      diagnosisCopy: null,
      form: {},
      comments: [],
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
    diagnosis() {
      if (this.diagnosis.comment != '') {
        this.allow = false
      } else {
        this.allow = true
      }
    },
  },
  props: {
    consultationData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getICD10(1, this.searchParam)
    this.getDiagnosis()
  },
  methods: {
    async getICD10(page = 1, e) {
      // this.currentFilter = e
      try {
        let response = await this.$api.core.getICD({ page, ...e })
        let array = response.results
        const formatted = array.map((el) => ({
          ...el,
          selected: false,
          confirmed: false,
        }))
        this.icdTernCollection = formatted
        this.pages = response.total_pages
        console.log(response)
      } catch {}
    },
    searchByString: debounce(function (e) {
      this.searchParam.search = e
      this.getICD10(1, this.searchParam)
    }, 1000),
    searchOptions: debounce(function (e) {
      this.searchParam.search = e
      this.getICD10(1, this.searchParam)
    }, 1000),
    diagnosisNames(e) {
      if (typeof e === 'string') {
        return e
      }  
      if(Array.isArray(e)){
        let arr = e
        let newArr = []
        for (let x = 0; x < arr.length; x++) {
          newArr.push(arr[x])
        }
        let str = newArr.join(', ')
        return str
      }
      if(typeof e === 'object'){
        return e.case
      }
    },
    openModal(e) {
      this.$bvModal.show('icd10modal')
      this.role = e
    },
    setDiagnosis(e, i) {
      if (!this.diagnosis[i].comment.includes(e.case)) {
        this.diagnosis[i].comment.push(e.case)
      }
    },
    addNewRecord() {
      this.diagnosis.push({
        comment: [],
        option: null,
      })
    },
    removeRecord(e) {
      this.diagnosis.splice(e, 1)
    },
    addItem() {
      this.comments.push({
        queue: Math.random(),
        created_by: {
          first_name: '',
          last_name: '',
        },
        value: {
          comment: '',
          option: '',
        },
      })
      console.log(this.comments)
    },
    deleteItem(e) {
      console.log(e)
      let x = this.comments.length - 1
      this.comments.splice(x, 1)
    },
    addOption() {
      console.log(this.diagnosis)
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
    async updateRecord(e, id) {
      try {
        let response = await this.$axios.$put(
          `encounters/${this.consultationData.id}/charts/diag/${id}/`,
          {
            value: {
              comment: e.comment,
              option: 'working',
              confirmed: true,
            },
          }
        )
        this.getDiagnosis()
      } catch (error) {
        this.$toast({
          type: 'error',
          text: '',
        })
      }
    },
    async confirmDiagnosis(e, id) {
      this.diagnosisCopy = e.comment
      try {
        let response = await this.$axios.$post(
          `encounters/${this.consultationData.id}/charts/`,
          {
            chart: {
              diag: {
                comment: this.diagnosisCopy,
                option: 'confirmed',
              },
            },
          }
        )
        this.updateRecord(e, id)
        // this.getDiagnosis()
      } catch (error) {
        this.$toast({
          type: 'error',
          text: '',
        })
      } finally {
      }
    },
    async addDiagnosis() {
      this.isLoading = true
      if (
        this.diagnosis[0].comment.length > 0 &&
        this.diagnosis[0].option != null
      ) {
        try {
          let response = await this.$axios.$post(
            `encounters/${this.consultationData.id}/charts/`,
            {
              chart: {
                diag: this.diagnosis,
              },
            }
          )

          this.tag = false
          this.kink = false
          this.step = true
          this.getDiagnosis()
          this.$toast({
            type: 'success',
            text: 'Diagnosis added',
          })
          this.diagnosis = [
            {
              comment: [],
              option: null,
            },
          ]
        } catch (error) {
          this.$toast({
            type: 'error',
            text: 'An error occured',
          })
        } finally {
          // this.getPatientRecord();
          this.isLoading = false
        }
      } else {
        this.$toast({
          type: 'info',
          text: 'Please fill in a diagnosis and option',
        })
      }
    },
    showComment() {
      // this.tag = true
      // this.kink = true
      // this.step = false
      this.openModal()
    },
    closeForm() {
      this.tag = false
      this.kink = false
      this.step = true
      this.diagnosis = [
        {
          comment: [],
          option: null,
        },
      ]
    }
  
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