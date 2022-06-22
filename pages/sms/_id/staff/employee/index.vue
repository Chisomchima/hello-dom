<template>
  <div class="">
    <div class="d-flex justify-content-between mb-3">
      <div class="mb-3">
        <h2 class="titletext mb-0">Employee</h2>
      </div>
      <div>
        <b-btn
          class="btn-dark"
          @click="$router.push({ path: 'employee/bulk-upload' })"
          >Bulk Upload</b-btn
        >
        <b-btn class="bg-primary" @click="goToAddEmployee"> Add Employee</b-btn>
      </div>
    </div>
    <div v-show="showAll" class="btn_contain my-4">
      <div>
        <b-btn class="bg-dark text-white mr-3" @click="exportAll">
          Export
        </b-btn>
        <b-btn class="bg-primary text-white" @click="emailAll">
          Email Staff Code</b-btn
        >
      </div>
    </div>

    <div class="bg-white p-3">
      <UtilsFilterComponent @search-input="search($event)">
        <template #default="{ visualization }">
          <Table
            v-if="visualization === 'list'"
            :items="staffs"
            :allow-redirect="false"
            :is-busy="isBusy"
            :pages="pages"
            @page-changed="changePage"
            :fields="fields"
            @single-row="showButton"
            @row-clicked="goToSingleStaff"
          />

          <div v-else class="row">
            <div class="row" v-for="(staff, index) in staffs">
              <div :key="index" class="col m-2 more-width">
                <div class="classes-list-card px-4">
                  <div class="dropdown">
                    <button
                      id="dropdownMenuButton"
                      class="btn btn-sm"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        focusable="false"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                        class="iconify"
                        data-inline="false"
                        data-icon="bi:three-dots-vertical"
                        style="transform: rotate(360deg)"
                      >
                        <g fill="currentColor">
                          <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
                          ></path>
                        </g>
                      </svg>
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div @click="goToSingleStaff(staff)" class="px-3">
                        View Profile
                      </div>
                    </div>
                  </div>

                  <div class="user-image text-center mb-3">
                    <img
                      class="mx-auto"
                      :src="
                        staff.avatar
                          ? staff.avatar
                          : 'https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg'
                      "
                    />
                  </div>
                  <div class="subtitle-text mb-2">
                    {{ staff.first_name ? staff.first_name : '--' }}
                    {{ staff.last_name ? staff.last_name : '--' }}
                  </div>

                  <div v-show="staff.phone_number" class="text-center mb-3">
                    <small class=""
                      >{{ staff.phone_number ? staff.phone_number : '--' }}
                    </small>
                  </div>

                  <div class="text-center mt-3">
                    <button class="btn btn-light">
                      <div class="d-flex align-items-center">
                        <div class="mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            style="font-size: 20px; transform: rotate(360deg)"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                            class="iconify"
                            data-inline="false"
                            data-icon="fluent:mail-16-regular"
                          >
                            <g fill="none">
                              <path
                                d="M2 6.038V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1.038zM4 4h8a1 1 0 0 1 1 1v.74L8 8.432L3 5.74V5a1 1 0 0 1 1-1zM3 6.876L7.763 9.44a.5.5 0 0 0 .474 0L13 6.876V11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.876z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <div>Message</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UtilsFilterComponent>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: 1,
      showAll: false,
      page: 1,
      searchStaff: '',
      allStaff: [],
      isBusy: false,
      staffs: [],
      fields: [
        { key: 'check', sortable: false },
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'gender', sortable: true },
        { key: 'department', sortable: true },
        { key: 'position', sortable: true },
        { key: 'phone_number', sortable: true },

        { key: 'email', sortable: true },
        // { key: 'status', sortable: true },
      ],
    }
  },
  async fetch() {
    const schoolId = this.$store.state.administration.school.id

    const { data } = await this.$axios.get(
      `/slate-admin/school/${schoolId}/staff/hr/?page=${this.page}&name=${this.searchStaff}`
    )
    this.pages = data.pages
    this.staffs = data.data.map((staff) => ({
      check: '',
      employee_number: staff.employee_id_number,
      status: staff.linked,
      ...staff,
    }))
    console.log('staffs', this.staffs)
  },
  watch: {
    page: {
      handler() {
        this.$nuxt.refresh()
      },
    },
  },
  methods: {
    search(e) {
      this.searchStaff = e
      this.$fetch()
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1
      }
    },
    nextPage() {
      if (this.page < this.pages) {
        this.page += 1
      }
    },
    changePage(e) {
      this.page = e
      console.log('rom parent', e)
    },
    async emailAll() {
      console.log(this.allStaff)
      const slate_school_id = await this.$store.state.administration.school.id

      const entity_ids = []
      this.allStaff.forEach((staff) => {
        entity_ids.push(staff.id)
      })
      try {
        this.$axios.post(
          `/slate-admin/school/${slate_school_id}/send/activation_code/sms/bulk/?entity=staff`,
          {
            entity: 'staff',
            entity_ids,
          }
        )
      } catch (error) {}
      console.log('entity', entity_ids)
      console.log(this.allStudents)
    },
    exportAll() {
      const itemsFormatted = []
      this.allStaff.forEach((item) => {
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''), // remove commas to avoid errors,
          last_name: item.last_name,
          email: item.email,
          gender: item.gender,
          status: item.status,
        })
      })

      // const csv = this.convertToCSV(newStudents)
      this.exportCSVFile(
        {
          first_name: 'First Name'.replace(/,/g, ''), // remove commas to avoid errors
          last_name: 'Last Name',
          email: 'Email',
          gender: 'Gender',
          status: 'Status',
        },
        itemsFormatted,
        'All Staff'
      )
    },
    convertToCSV(objArray) {
      const array =
        typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
      let str = ''

      for (let i = 0; i < array.length; i++) {
        let line = ''
        for (const index in array[i]) {
          if (line !== '') line += ','

          line += array[i][index]
        }

        str += line + '\r\n'
      }

      return str
    },
    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers)
      }

      // Convert Object to JSON
      const jsonObject = JSON.stringify(items)

      const csv = this.convertToCSV(jsonObject)

      const exportedFilenmae = fileTitle + '.csv' || 'export.csv'

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae)
      } else {
        const link = document.createElement('a')
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', exportedFilenmae)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    },
    showButton(e) {
      this.allStaff = e
      console.log(this.allStaff)
      if (this.allStaff.length) {
        this.showAll = true
      } else {
        this.showAll = false
      }
    },
    async goToSingleStaff(e) {
      console.log(e)
      const schoolCode = await this.$store.state.administration.school.code

      // this.$router.push(`/sms/${schoolCode}/staff/employee/${e.id}`)

      this.$router.push({
        path: `/sms/${schoolCode}/staff/employee/${e.id}`,
        query: { _name: `${e.first_name} ${e.last_name}` },
      })

      console.log(e)
    },
    goToAddEmployee() {
      this.$router.push('employee/add')
    },
    async allSelected(e) {
      console.log(e)
    },
  },
}
</script>

<style scoped>
.more-width {
  width: 15rem;
}
</style>
