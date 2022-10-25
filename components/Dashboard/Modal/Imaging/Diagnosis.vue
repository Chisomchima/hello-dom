<template>
  <div>
    <ModalWrapper
      size="lg"
      id="diagnosisModal"
      @hide="closeModal"
      :title="`Diagnosis lists`"
      :stacking="false"
      :arrangement="false"
      :cancelText="'Close'"
    >
      <div>
        <div class="d-flex flex-wrap text-white">
          <div
            v-for="(item, index) in tray"
            :key="index"
            :class="item.confirmed ? 'bg-success' : 'bg-info'"
            class="
              d-flex
              justify-content-between
              col-md-2
              px-1
              py-1
              mb-2
              rounded-sm
              text-14
              mx-2
            "
          >
            <div class="text-truncate">{{ item.case }}</div>
            <span @click="removeDiag(index, item)" class="point">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="p-3">
          <input
            type="text"
            placeholder=" Type to search..."
            class="form-control ng-untouched ng-pristine ng-valid"
            v-model="searchParam"
          />
        </div>
        <TableComponent
          :items="dataOBJS"
          :fields="fields"
          :pages="pages"
          :busy="busy"
          @row-selected="onRowSelected"
          @page-changed="goToNextPage"
        >
          <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="pick($event.target.checked, data.item, data.index)"
              />
              <span class="checkmark"></span>
            </label>
          </template>
          <template #dial="{ data }">
            <div class="d-flex align-items-center">
              <b-form-checkbox
                size="lg"
                switch
                @change="setToConfirmed(data.item, $event)"
              >
              </b-form-checkbox>
              <div
                v-if="data.item.confirmed == true"
                class="mt-2 text-success text-12"
              >
                Confirmed
              </div>
              <div class="mt-2 text-12" v-else>Working</div>
            </div>
          </template>
        </TableComponent>
      </div>
      <!-- :checked="checkIfExist(data.item)"
                :disabled="enabled" -->
    </ModalWrapper>
  </div>
</template>

<script lang="ts">
import TableFunc from '~/mixins/TableCompFun'
import Vue from 'vue'
export default Vue.extend({
  mixins: [TableFunc],
  props: {
    options: {
      type: Array,
      required: false,
    },
   
  },
  watch: {
    searchParam() {
      if (this.searchParam.length > 2) {
        this.busy = true
        this.getICD10(1, this.searchParam)
        // this.$emit('searchParam', this.searchParam)
      } else if (this.searchParam.length === 0) {
        this.busy = true
        this.getICD10(1, this.searchParam)
        // this.$emit('searchParam', this.searchParam)
      }
    },
  },
  data() {
    return {
      dataOBJS: [],
      selected: [],
      tray: [],
      searchParam: '',
      fields: [
        {
          key: 'clear',
          label: '',
          sortable: true,
        },
        {
          key: 'code',
          label: 'Code',
          sortable: true,
        },
        {
          key: 'case',
          label: 'Case',
          sortable: true,
        },
        // {
        //   key: 'dial',
        //   label: 'Option',
        //   sortable: true,
        // },
      ],
    }
  },
  mounted() {
    this.dataOBJS = this.options
    this.getICD10()
  },
  methods: {
    async getICD10(page = 1, e) {
      // this.currentFilter = e
      let search = {search : e}
      try {
        let response = await this.$api.core.getICD({ page, ...search })
        let array = response.results
        const formatted = array.map((el) => ({
          ...el,
          selected: false,
          confirmed: false,
        }))
        this.dataOBJS = formatted
        this.pages = response.total_pages
        this.busy = false
        console.log(response)
      } catch {}
    },
    pick(event, item, index) {
      if (event === true) {
        this.tray.push(item)
      } else {
        for (let x = 0; x < this.tray.length; x++) {
          if (item.code === this.tray[x].code) {
            this.tray.splice(x, 1)
          }
        }
      }
      // this.$emit('diagnosis', item, index)
    },
    removeDiag(index, item) {
      this.tray.splice(index, 1)
    },
    setToConfirmed(e, a) {
      for (let x = 0; x < this.tray.length; x++) {
        let item = this.tray[x]
        if (item.case === e.case) {
          this.tray[x].confirmed = a
        }
      }
      console.log(e, a)
    },
    goToNextPage(n) {
      this.busy = true
       this.getICD10(n, this.searchParam)
    },
    closeModal() {
      this.getICD10()
      this.$emit('diagnosis', this.tray)
    },
    onRowSelected(items) {
        console.log(items)
      },
    async addDiagnosis() {
      let arr = this.tray
      let requestBody = []
      for (let x = 0; x < arr.length; x++) {
        let tempObj = {
          comment: arr[x],
          option: 'working',
        }
        if (arr[x].confirmed === true) {
          tempObj.option = 'confirmed'
        }
        delete tempObj.comment.selected
        delete tempObj.comment.confirmed
        requestBody.push(tempObj)
      }
      try {
        let response = await this.$axios.$post(
          `encounters/${this.consultationData.id}/charts/`,
          {
            chart: {
              diag: requestBody,
            },
          }
        )
        this.$toast({
          type: 'success',
          text: 'Diagnosis added',
        })
        this.tray = []
        this.$bvModal.hide('diagnosisModal')
      } catch (error) {
        this.$toast({
          type: 'error',
          text: 'An error occured',
        })
      } finally {
      }
    },
  },
})
</script>

<style lang="scss" scoped>
</style>

