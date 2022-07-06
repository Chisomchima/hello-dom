<template>
  <div class="table-responsive">
    <b-table
      id="globalTable"
      :items="items"
      :fields="sortable_cols"
      stacked="md"
      :filter="filter"
      hover
      striped
      responsive
      show-empty
      sort-icon-left
      :busy="busy"
      :per-page="perPage"
      class="custom-table"
      :class="classCustom"
      :table-class="tableClass"
      :tbody-tr-class="disabledTableRowMethod"
      @row-clicked="checkForBillStatusOnRowClick($event)"
    >
      <template #table-busy>
        <div class="p-4">
          <b-skeleton-table
            :rows="4"
            :columns="4"
            :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table>
        </div>
      </template>

      <template #cell(current_academic_year)="data">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <span
          class="badge"
          :class="[data.value ? 'badge-success' : 'badge-danger']"
          >{{ data.value ? 'Active' : 'Inactive' }}</span
        >
      </template>

      <template #cell(color)="data">
        <slot name="color" :data="data">
          <div
            class="rounded-circle"
            style="height: 25px; width: 25px"
            :style="{ backgroundColor: data.value }"
          ></div>
        </slot>
      </template>
      <template #cell(week)="data">
        <slot name="week" :data="data">
          {{ data.value }}
        </slot>
      </template>

      <template #cell(assign)="data">
        <slot name="assign" :data="data">
          {{ data.value }}
        </slot>
      </template>

      <template #cell(name)="data">
        <slot name="name" :data="data">
          {{ data.value }}
        </slot>
        <!-- <div class="text-center">
          <span class="badge red-badge">{{ data.value }}</span>
        </div> -->
      </template>
      <template #cell(myProgress)="data">
        <slot name="myProgress" :data="data">
          {{ data.value }}
        </slot>
      </template>
      <template #cell(student_status)="data">
        <slot name="student_status" :data="data">
          {{ data.value }}
        </slot>
      </template>
      <template #cell(triple_actions)="data">
        <slot name="triple_actions" :data="data">
          {{ data.value }}
        </slot>
      </template>

      <template #cell()="data">
        <span class="text-capitalize"> {{ data.value }}</span>
      </template>

      <template #table-colgroup="scope">
        <template v-for="field in scope.fields">
          <col
            v-if="field.key === 'last_name' || field.key === 'first_name'"
            :key="field.key"
            :style="{ width: '10rem' }"
          />
        </template>
      </template>

      <template #head(last_name)>
        <span>Surname</span>
      </template>

      <template #cell(house)="data">
        <slot name="house" :data="data">{{ data.value }}</slot>
        <!-- <span class="text-capitalize"> {{ data.value }}</span> -->
      </template>

      <template #cell(clear)="data">
        <slot name="clear" :data="data">{{ data.value }}</slot>
        <!-- <span class="text-capitalize"> {{ data.value }}</span> -->
      </template>

      <template #cell(state)="data">
        <slot name="state" :data="data">{{ data.value }}</slot>
      </template>
      <template #cell(action)="data">
        <slot name="action" :data="data">{{ data.value }}</slot>
      </template>

      <template #cell(details)="data">
        <slot name="details" :data="data">
          <button class="btn btn-sm btn-primary" @click="data.toggleDetails()">
            Details
          </button>
        </slot>
      </template>
      <template #row-details="data">
        <slot name="row-details" :data="data"></slot>
      </template>

      <template #cell(value)="item">
        <slot name="value" :data="item"></slot>
      </template>

      <template #cell(reference_range)="item">
        <slot name="reference_range" :data="item"></slot>
      </template>

      <template #cell(submissions)="data">
        <slot name="submissions" :data="data">{{ data.value }}</slot>
      </template>
      <template #cell(edit)="item">
        <slot name="edit" :data="item"></slot>
      </template>

      <template #cell(status)="data">
        <slot name="status" :data="data">
          <span
            v-if="data.item.status === 'New'"
            class="text-14 badge-warning rounded text-center p-1 text-white"
            style="margin: 0"
            >{{ data.item.status }}</span
          >
          <span
            v-else-if="data.item.status === 'NS'"
            class="text-14 badge-info rounded text-center p-1 text-white"
          >
            {{ data.item.status }}
          </span>

          <span
            v-else
            class="text-14 badge-danger rounded text-center p-1 text-white"
          >
            {{ data.item.status }}
          </span>
        </slot>
      </template>
      <template #cell(info)="data">
        <slot name="info" :data="data">{{ data.value }}</slot>
      </template>
      <template #cell(avatar)="data">
        <slot name="avatar" :data="data">{{ data.value }}</slot>
      </template>

      <template #cell(liveClass)="data">
        <slot name="liveClass" :data="data"></slot>
      </template>

      <template #cell(print)="data">
        <slot name="print" :data="data"></slot>
      </template>
      <template #cell(cleared_status)="item">
        <slot name="cleared_status" :data="item"></slot>
      </template>

      <template #cell(type)="item">
        <slot name="type" :data="item"></slot>
      </template>
      <template #cell(obv)="item">
        <slot name="obv" :data="item"></slot>
      </template>
      <template #cell(specimen_type)="item">
        <slot name="specimen_type" :data="item"></slot>
      </template>
      <template #cell(lab_unit)="item">
        <slot name="lab_unit" :data="item"></slot>
      </template>
      <template #cell(panel)="item">
        <slot name="panel" :data="item"></slot>
      </template>
      <template #cell(cancel)="item">
        <slot name="cancel" :data="item"></slot>
      </template>

      <template #cell(download)="data">
        <slot name="download" :data="data">{{ data.value }}</slot>
      </template>

      <template #cell(actions)="row">
        <div class="text-left w-auto">
          <button
            v-if="!disableEditAction"
            class="btn"
            @click="$emit('edit', row.item)"
          >
            <b-icon variant="info" icon="pencil-square"></b-icon>
          </button>
          <button
            v-if="!disableDeleteAction"
            class="btn"
            @click="$emit('delete', row.item)"
          >
            <b-icon variant="danger" icon="trash"></b-icon>
          </button>
        </div>

        <!-- <button class="btn">
          <span class="iconify text-danger" data-icon="mi:delete"></span>
        </button> -->

        <!-- <b-button size="sm" class="mr-1"> Info modal </b-button> -->
        <!-- <b-button size="sm"> extra_icons </b-button> -->
      </template>
      <template #cell(dots)="row">
        <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-icon icon="three-dots-vertical"></b-icon>
          </template>
          <template v-if="dropdownItem.length > 0">
            <b-dropdown-item
              v-for="(dropdown, index) in dropdownItem"
              :key="index"
              class="text-capitalize"
              @click="$emit(dropdown, row.item)"
              >{{ dropdown.split('_').join(' ') }}</b-dropdown-item
            >
          </template>
        </b-dropdown>
      </template>

      <template #table-colgroup="scope">
        <template v-for="field in scope.fields">
          <col
            v-if="field.key === 'email'"
            :key="field.key"
            :style="{ width: '15rem' }"
          />
          <col
            v-else-if="field.key === 'date'"
            :key="field.key"
            :style="{ width: '10rem' }"
          />
          <col
            v-else-if="field.key === 'service_name'"
            :key="field.key"
            :style="{ width: '50rem' }"
          />
          <col
            v-else-if="field.key === 'order_no'"
            :key="field.key"
            :style="{ width: '20rem' }"
          />
        </template>
      </template>
    </b-table>

    <b-pagination
      v-if="paginate"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="right"
      size="sm"
      class="my-0"
      @change="$emit('page-changed', $event)"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  props: {
    isClientPagination: {
      type: Boolean,
      default: false,
    },
    // currentPage: {
    //   type: Number,
    //   default: 1,
    // },

    classCustom: {
      type: String,
      default: 'custom-class',
    },
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      default: () => [],
      required: false,
    },
    perPage: {
      type: Number,
      default: 12,
    },
    /**
     * @description
     * The number of pages coming from the server(API)
     */
    pages: {
      type: Number,
      default: 0,
    },
    busy: {
      type: Boolean,
      default: false,
    },
    /**
     * @description
     * If true, pagination will be displayed
     */
    paginate: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: String,
      required: false,
      default: '',
    },

    // this is for the three dots dropdown
    dropdownItem: {
      type: Array,
      default: () => [],
    },
    tableClass: {
      type: String,
      default: 'custom-table pointer',
    },
    disableEditAction: {
      type: Boolean,
      default: false,
    },
    disableDeleteAction: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      totalRows: 0,
      currentPage: 1,
    }
  },
  computed: {
    sortable_cols() {
      console.log(this.fields)
      return this.fields.map((f) => {
        const disabledOpacity = ['dots', 'status', 'actions', 'dots', 'dot']
        const notSortColumn = ['actions', 'download', 'liveClass', 'dots']
        // eslint-disable-next-line prefer-const
        let tmp = f
        if (disabledOpacity.includes(tmp.key)) {
          tmp.tdClass = 'removeTableDisabled'
        }

        if (notSortColumn.includes(tmp.key)) {
          return tmp
        }

        if (tmp.key === 'avatar') {
          tmp.sortable = false
        } else if (
          tmp.key === 'contents' ||
          tmp.key === 'full_score' ||
          tmp.key === 'number_of_questions' ||
          tmp.key === 'triple_actions'
        ) {
          tmp.sortable = false
        } else {
          tmp.sortable = true
        }
        return tmp
      })
    },
  },
  watch: {
    pages() {
      // This is a hack to help to get the total rows in the DB
      // Then passes it to bootstrap to do his work
      this.totalRows = this.perPage * this.pages
    },
  },
  mounted() {
    this.totalRows = this.perPage * this.pages
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      // this.currentPage = 1
    },

    disabledTableRowMethod(item, type) {
      if (!item || type !== 'row') return
      if (item.bill) {
        if (item.bill.cleared_status !== 'CLEARED') {
          // this.$refs.tooltip.$emit('enable')
          return 'disabledTableRow'
        }
      }
      return ''

      // if (item.status === 'awesome') return 'disabledTableRowMethod'
    },

    checkForBillStatusOnRowClick(item) {
      if (item.bill) {
        if (item.bill.cleared_status !== 'CLEARED') {
          this.$toast({
            type: 'info',
            text: 'Bill is not cleared',
          })
          return
        } else {
          this.$emit('row-clicked', item)
          return
        }
      }
      this.$emit('row-clicked', item)
    },

    rowHovered() {
      console.log('HEHEH')
      //  this.$refs.tooltip.$emit('enable')
    },
  },
}
</script>

<style scoped>
</style>
