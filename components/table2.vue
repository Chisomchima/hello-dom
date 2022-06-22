<template>
  <div class="table-responsive">
    <b-table
      ref="selectableTable"
      striped
      responsive
      hover
      :busy="isBusy"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :items="items"
      class="custom-table"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      selectable
      no-select-on-click
      show-empty
      @row-selected="onRowSelected"
      @row-clicked="$emit('row-clicked', $event)"
      @filtered="onFiltered"
    >
      <template #head(check)="row">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox
          ref="tableCheckBox"
          v-model="row.detailsShowing"
          @change="selectAllRows"
          @click="selectAllRows"
        >
        </b-form-checkbox>
      </template>
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(check)="row">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <span @click="toggleSingleRow(row)">
          <b-form-checkbox
            v-model="row.rowSelected"
            @change="row.toggleDetails"
          >
          </b-form-checkbox>
        </span>
      </template>

      <template #cell(current_academic_year)="data">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <span
          class="badge"
          :class="[data.value ? 'badge-success' : 'badge-danger']"
          >{{ data.value ? 'Active' : 'Inactive' }}</span
        >
      </template>

      <template #head(three_dots)="data">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <div></div>
      </template>
      <template #cell(three_dots)="data">
        <div @click="handleDots(data)">
          <span class="iconify" data-icon="bi:three-dots-vertical"></span>
        </div>
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>
      <template #cell(color)="data">
        <div
          class="rounded-circle"
          style="height: 25px; width: 25px"
          :style="{ backgroundColor: data.value }"
        ></div>
      </template>
      <template #cell(id)>
        <div></div>
      </template>
      <template #head(id)>
        <div></div>
      </template>
      <template #cell()="data">
        <div class="border-primary singular">
          {{ data.value }}
        </div>
      </template>
      <template #head(image)="">
        <div></div>
      </template>
      <template #cell(primary_contact)="data">
        <div class="m-0">
          <span v-if="data.value == true" class="text-primary"> Emergency</span>
        </div>
      </template>
    </b-table>

    <div v-show="showPagination" class="mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        class="my-0"
      ></b-pagination>
      <!-- {{selected}} -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: [Object, Array],
      required: true,
      default: () => ({}),
    },
    'per-page': {
      type: Number,
      default: 7,
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false,
    },
    showPagination: {
      type: Boolean,
      required: false,
      default: true,
    },
    fields: {
      type: Array,
      required: false,
      default: [],
    },

    sortDirection: {
      type: String,
      required: false,
      default: 'asc',
    },
    filterOn: {
      type: Array,
      required: false,
      default: () => [],
    },
    filter: {
      type: String,
      required: false,
      default: null,
    },
    allowRedirect: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      //  totalRows: 1,
      currentPage: 1,
      // filter: '',
      // filterOn: [],
      // sortDirection: 'asc',
      allSelected: false,
      selected: [],
      sortBy: 'house',
      sortDesc: false,
    }
  },
  computed: {
    totalRows() {
      return this.items.length
    },
  },

  methods: {
    handleDots(data) {
      console.log(data)
    },
    redirect(e) {
      if (this.allowRedirect === true) {
        this.$router.push(`${e.item.route}/${e.item.id}`)
      }
    },
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected()
        this.allSelected = !this.allSelected
        setTimeout(() => {
          this.$emit('allSelected', this.selected)
        }, 100)
      } else {
        this.$refs.selectableTable.selectAllRows()
        this.allSelected = !this.allSelected
        setTimeout(() => {
          this.$emit('allSelected', this.selected)
        }, 100)
      }
    },
    toggleSingleRow(i) {
      if (i.rowSelected === true) {
        setTimeout(() => {
          this.$refs.selectableTable.unselectRow(i.index)
        }, 100)
      } else if (i.rowSelected === false) {
        setTimeout(() => {
          this.$refs.selectableTable.selectRow(i.index)
        }, 100)
      }

      // Rows are indexed from 0, so the third row is index 2
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style>
.iconify:hover {
  cursor: pointer;
}
.table_container {
  border-radius: 10px;
  background-color: white;
  padding: 0px 10px 5px 20px;
}
.singular:hover {
  cursor: pointer;
}
</style>
